'use client'; // <--- Needed because we use a Hook (usePathname)

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <--- Hook to get current URL

const Sidebar = () => {
  const pathname = usePathname(); // Example value: "/orders" or "/"

  // Helper function to assign classes based on active state
  // We accept 'path' as the argument for the link we want to check
  const getLinkStyle = (path: string) => {
    // Check if the current URL starts with the link path
    // (e.g., if we are on /orders/101, the /orders link should still be active)
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);

    return {
      color: 'white',
      textDecoration: 'none',
      marginBottom: '15px',
      fontSize: '18px',
      padding: '10px',
      borderRadius: '5px',
      display: 'block', // Makes the whole clickable area nice
      backgroundColor: isActive ? '#34495e' : 'transparent', // Darker background if active
      borderLeft: isActive ? '4px solid #3498db' : '4px solid transparent', // Blue bar on left if active
      transition: 'all 0.3s ease'
    };
  };

  return (
    <div className="sidebar">
      <h2>Store Admin</h2>
      
      <Link href="/" style={getLinkStyle('/')}>
        Dashboard
      </Link>
      
      <Link href="/products" style={getLinkStyle('/products')}>
        Products
      </Link>
      
      <Link href="/orders" style={getLinkStyle('/orders')}>
        Orders
      </Link>
    </div>
  );
};

export default Sidebar;