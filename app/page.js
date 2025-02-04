import React from 'react';

export default async function ProductListingPage() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

    let products = [];
    try {
      const productsRes = await fetch(`${API_URL}/api/products`, {
        cache: 'no-store', // Prevents caching for fresh data on every request
      });
      console.log("API_URL:", API_URL)
      console.log("Fetch response:", productsRes.status); // Check full response
      console.log("Response Headers:", productsRes.headers);

      if (!productsRes.ok) {
        throw new Error('Failed to fetch products');
      }
      products = await productsRes.json();
    } catch (error) {
      console.error(error);
    }
  
    return (
      <main>
        <h1>Products</h1>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id}>
                <a href={`/product/${product.id}`}>{product.name}: ${product.price}</a>
              </li>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      </main>
    );
  }
  









/*
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
*/