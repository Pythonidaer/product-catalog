import React from 'react';
export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage({ params }) {

    const { id } = params;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
    let product = null;
    try {
      const productRes = await fetch(`${API_URL}/api/products/${id}`, {
        cache: 'no-store',
      });
      if (!productRes.ok) {
        throw new Error('Failed to fetch product details');
      }
      product = await productRes.json();
    } catch (error) {
      console.error(error);
    }
  
    return (
      <main>
        <h1>Product Details</h1>
        {product ? (
          <div>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </main>
    );
  }
  







/*  return (
    <main>
      <h1>Product Details</h1>
      <div>
        {/* Product details will go here }
        <p>Product ID: {params.id}</p>
      </div>
    </main>
  );
}
*/