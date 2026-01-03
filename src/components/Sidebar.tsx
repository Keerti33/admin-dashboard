'use client'; 

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname(); 


  const getLinkStyle = (path: string) => {

    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);

    return {
      color: 'white',
      textDecoration: 'none',
      marginBottom: '15px',
      fontSize: '18px',
      padding: '10px',
      borderRadius: '5px',
      display: 'block', 
      backgroundColor: isActive ? '#34495e' : 'transparent', 
      borderLeft: isActive ? '4px solid #3498db' : '4px solid transparent', 
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