import React from 'react';

export default async function ProductListingPage() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const productsRes = await fetch(`${API_URL}/api/products`);
  const products = await productsRes.json();
  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}: ${product.price}</li>
        ))}
      </ul>
    </main>
  );
}
