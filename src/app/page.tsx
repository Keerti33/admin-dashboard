'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductTable from '../components/ProductTable'; // <--- Import the new table

export default function Home() {
  // --- STATE & LOGIC (Kept here in the Parent) ---
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Mouse", price: 25.99, category: "Electronics" },
    { id: 2, name: "Mechanical Keyboard", price: 120.50, category: "Electronics" },
    { id: 3, name: "Notebook", price: 5.00, category: "Stationery" },
    { id: 4, name: "Coffee Mug", price: 12.00, category: "Kitchen" },
    { id: 5, name: "HDMI Cable", price: 15.00, category: "Electronics" },
  ]);

  const [form, setForm] = useState({ name: "", price: "", category: "Electronics" });
  const [editId, setEditId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;

    if (editId !== null) {
      const updatedProducts = products.map((product) => 
        product.id === editId 
          ? { ...product, name: form.name, price: parseFloat(form.price), category: form.category }
          : product
      );
      setProducts(updatedProducts);
      setEditId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name,
        price: parseFloat(form.price),
        category: form.category
      };
      setProducts([...products, newProduct]);
    }
    setForm({ name: "", price: "", category: "Electronics" });
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
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

        {/* THE NEW COMPONENT */}
        {/* We pass our data and functions DOWN to the child here */}
        <ProductTable 
          products={filteredProducts} 
          onEdit={handleEditProduct} 
          onDelete={handleDeleteProduct} 
        />

      </div>
    </div>
  );
}