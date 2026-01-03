import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar'; // We reuse our Sidebar!

export default function OrdersPage() {

  const orders = [
    { id: 101, customer: "Alice Johnson", total: 54.00, status: "Shipped" },
    { id: 102, customer: "Bob Smith", total: 12.50, status: "Processing" },
    { id: 103, customer: "Charlie Brown", total: 120.00, status: "Delivered" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <h1>Orders</h1>
        <p>Manage customer orders here.</p>

        <div style={{ marginTop: '20px' }}>
          <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ textAlign: 'left' }}>Order ID</th>
                <th style={{ textAlign: 'left' }}>Customer</th>
                <th style={{ textAlign: 'left' }}>Total</th>
                <th style={{ textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      backgroundColor: order.status === 'Delivered' ? '#d4edda' : 
                                       order.status === 'Shipped' ? '#cce5ff' : '#fff3cd',
                      color: order.status === 'Delivered' ? '#155724' : 
                             order.status === 'Shipped' ? '#004085' : '#856404'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  {/* NEW COLUMN FOR LINK */}
                  <td>
                    <Link 
                      href={`/orders/${order.id}`} 
                      style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}