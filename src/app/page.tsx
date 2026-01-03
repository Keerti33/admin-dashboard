'use client';

import { useRouter } from "next/navigation";
import SalesChart from '../components/SalesChart';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductTable from '../components/ProductTable';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
  
    const isAdmin = localStorage.getItem("isAdmin");
    
    if (!isAdmin) {
      router.push("/login");
    }
  }, []);
 
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); 

  const [form, setForm] = useState({ name: "", price: "", category: "Electronics" });
  const [editId, setEditId] = useState<string | null>(null); 
  const [searchTerm, setSearchTerm] = useState("");
  
 
  const [file, setFile] = useState<File | null>(null); 
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      const formattedData = data.map((item: any) => ({
        ...item,
        id: item._id 
      }));
      
      setProducts(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;

    setUploading(true);
    let imageUrl = "";

  
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url; 
      } catch (error) {
        console.error("Upload failed", error);
        setUploading(false);
        return;
      }
    }

 
    const productData = {
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      imageUrl: imageUrl || undefined, 
    };

  
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/products/${editId}` : '/api/products';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setForm({ name: "", price: "", category: "Electronics" });
        setFile(null); 
        setEditId(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setUploading(false); 
    }
  };

  const handleDeleteProduct = async (id: string | number) => {
    setProducts(products.filter((product) => product.id !== id));

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert("Failed to delete product from database");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      fetchProducts(); 
    }
  };

  const handleEditProduct = (product: any) => {
    setEditId(product.id);
    setForm({ name: product.name, price: product.price, category: product.category });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Admin Dashboard</h1>
        
        {/* ADD FORM */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>{editId ? "Edit Product" : "Add New Product"}</h3>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            
            {/* Name */}
            <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            
            {/* Price */}
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            
            {/* Category */}
            <select name="category" value={form.category} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="Electronics">Electronics</option>
              <option value="Stationery">Stationery</option>
              <option value="Kitchen">Kitchen</option>
            </select>

            {/* --- FILE INPUT IS NOW HERE --- */}
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ padding: '8px' }}
            />

            {/* Button */}
            <button onClick={handleSave} disabled={uploading} style={{ padding: '8px 16px', backgroundColor: editId ? '#007bff' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {uploading ? "Uploading..." : (editId ? "Update Product" : "Add Product")}
            </button>
          
          </div>
        </div>

        <SalesChart />
        
        {/* SEARCH BAR (Cleaned up) */}
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>

        {/* TABLE */}
        {loading ? (
          <p>Loading products from database...</p>
        ) : (
          <ProductTable 
            products={filteredProducts} 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct} 
          />
        )}

      </div>
    </div>
  );
}