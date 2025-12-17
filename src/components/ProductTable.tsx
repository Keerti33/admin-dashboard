import React from 'react';

interface ProductTableProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            {/* --- NEW COLUMN --- */}
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Image</th>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Price</th>
            <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
              {/* --- NEW CELL: SHOW IMAGE OR PLACEHOLDER --- */}
              <td style={{ padding: '12px' }}>
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} 
                  />
                ) : (
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#888' }}>
                    No Img
                  </div>
                )}
              </td>

              <td style={{ padding: '12px', fontWeight: '500' }}>{product.name}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '12px', backgroundColor: '#e9ecef', fontSize: '12px', color: '#495057' }}>
                  {product.category}
                </span>
              </td>
              <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold' }}>${product.price}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <button 
                  onClick={() => onEdit(product)}
                  style={{ marginRight: '8px', padding: '6px 12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No products found. Add one above!
        </div>
      )}
    </div>
  );
};

export default ProductTable;