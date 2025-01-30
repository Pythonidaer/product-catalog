import React from 'react';

export default function ProductDetailsPage({ params }) {
  return (
    <main>
      <h1>Product Details</h1>
      <div>
        {/* Product details will go here */}
        <p>Product ID: {params.id}</p>
      </div>
    </main>
  );
}
