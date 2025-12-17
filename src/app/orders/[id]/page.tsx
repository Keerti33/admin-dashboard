'use client';

import React from 'react';
import { useParams } from 'next/navigation'; // <--- This hook reads the URL
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar'; // Note: We need to go up 3 levels now (../../..)

export default function OrderDetailsPage() {
  const params = useParams(); // Get the ID from the URL (e.g., "101")
  const orderId = params.id;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Link href="/orders" style={{ textDecoration: 'none', color: '#007bff', marginBottom: '20px', display: 'inline-block' }}>
          &larr; Back to Orders
        </Link>

        <h1>Order Details</h1>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#555' }}>Order #{orderId}</h2>
          <p>This is where you would fetch the full details for this specific order ID from your database.</p>
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
            <strong>Mock Status:</strong> Processing<br/>
            <strong>Mock Total:</strong> $150.00
          </div>
        </div>
      </div>
    </div>
  );
}