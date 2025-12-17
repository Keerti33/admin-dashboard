'use client';
import SalesChart from '../components/SalesChart';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductTable from '../components/ProductTable';

export default function Home() {
  // 1. DATA (Start with empty array, fetch real data later)
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // New: Loading state

  const [form, setForm] = useState({ name: "", price: "", category: "Electronics" });
  const [editId, setEditId] = useState<string | null>(null); // changed to string for MongoDB _id
  const [searchTerm, setSearchTerm] = useState("");

  // 2. FETCH DATA (THE NEW PART)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      // MongoDB returns '_id', but our table expects 'id'. Let's map it.
      const formattedData = data.map((item: any) => ({
        ...item,
        id: item._id // Create a fake 'id' property that matches _id
      }));
      
      setProducts(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  // 3. HANDLERS
  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;

    if (editId) {
      try {
        const response = await fetch(`/api/products/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            price: parseFloat(form.price),
            category: form.category
          }),
        });

        if (response.ok) {
          setEditId(null); // Exit edit mode
          setForm({ name: "", price: "", category: "Electronics" }); // Clear form
          fetchProducts(); // Refresh list to see changes
        } else {
          alert("Failed to update product");
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
  
    } else {
      // --- ADD MODE (Connected to DB!) ---
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            price: parseFloat(form.price),
            category: form.category
          }),
        });

        if (response.ok) {
          fetchProducts(); // Refresh the list from the server
          setForm({ name: "", price: "", category: "Electronics" });
        }
      } catch (error) {
        console.error("Error saving product:", error);
      }
    }
  };

  // (We will update Delete to use API in the next lesson)
  // 4. DELETE FUNCTION (Now connected to DB)
  const handleDeleteProduct = async (id: string | number) => {
    // Optimistic Update: Remove it from UI immediately so it feels fast
    setProducts(products.filter((product) => product.id !== id));

    try {
      // Send the command to the server
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // If server failed, revert the change (fetch the list again)
        alert("Failed to delete product from database");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      fetchProducts(); // Revert on error
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
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <select name="category" value={form.category} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="Electronics">Electronics</option>
              <option value="Stationery">Stationery</option>
              <option value="Kitchen">Kitchen</option>
            </select>
            <button onClick={handleSave} style={{ padding: '8px 16px', backgroundColor: editId ? '#007bff' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {editId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
         <SalesChart />
        {/* SEARCH BAR */}
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