'use client';

import React, { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Search Bar Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full text-gray-600 outline-none"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-900">Image</th>
              <th className="px-6 py-4 font-bold text-gray-900">Name</th>
              <th className="px-6 py-4 font-bold text-gray-900">Category</th>
              <th className="px-6 py-4 font-bold text-gray-900">Price</th>
              <th className="px-6 py-4 font-bold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id || product.id} className="hover:bg-gray-50">
                {/* Image Column */}
                <td className="px-6 py-4">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 rounded object-cover border" 
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400 border">
                      No Img
                    </div>
                  )}
                </td>

                {/* Name Column */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {product.name || product.title}
                </td>

                {/* Category Column - Using a pill shape */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                    {product.category || 'Electronics'} 
                  </span>
                </td>

                {/* Price Column - Green and Bold */}
                <td className="px-6 py-4 text-green-500 font-bold">
                  ${product.price}
                </td>

                {/* Actions Column - Yellow Edit, Red Delete */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-1.5 rounded font-semibold text-sm transition-colors">
                      Edit
                    </button>
                    <button className="bg-crimson-600 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded font-semibold text-sm transition-colors">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-6 text-center text-gray-500">No products found.</div>
        )}
      </div>
    </div>
  );
}