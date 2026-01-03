'use client';

import React, { useState, useEffect } from 'react';
import ProductTable from '@/components/ProductTable';

export default function ProductsPage() {
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
      
      const formattedData = data.map((item: any) => ({ ...item, id: item._id }));
      setProducts(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

 
  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setUploading(true);
    let imageUrl = "";

  
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url; 
      } catch (error) {
        console.error("Upload failed", error);
        setUploading(false); return;
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
    } catch (error) { console.error("Error saving:", error); } 
    finally { setUploading(false); }
  };

 
  const handleDeleteProduct = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) { console.error("Error deleting:", error); }
  };

  const handleEditProduct = (product: any) => {
    setEditId(product.id);
    setForm({ name: product.name, price: product.price, category: product.category });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Product Management</h1>

      {/* Add/Edit Form Section */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>{editId ? "Edit Product" : "Add New Product"}</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option>Electronics</option><option>Stationery</option><option>Kitchen</option>
          </select>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ padding: '8px' }} />
          <button onClick={handleSave} disabled={uploading} style={{ padding: '8px 16px', backgroundColor: editId ? '#f1c40f' : '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {uploading ? "Uploading..." : (editId ? "Update" : "Add")}
          </button>
        </div>
      </div>

      {/* Search & Table */}
      <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }} />
      
      {loading ? <p>Loading...</p> : (
        <ProductTable products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
      )}
    </div>
  );
}