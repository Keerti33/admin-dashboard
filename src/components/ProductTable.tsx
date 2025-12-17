import React from 'react';

// 1. Define what data this component NEEDS to work
interface ProductTableProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

// 2. The Component receives these "props" as arguments
const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <h3>Product List</h3>
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: 'white' }}>
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={{ textAlign: 'left' }}>ID</th>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Category</th>
            <th style={{ textAlign: 'left' }}>Price</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</td>
              <td style={{ textAlign: 'center' }}>
                {/* We use the functions passed down from the parent */}
                <button 
                  onClick={() => onEdit(product)} 
                  style={{ backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(product.id)} 
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;