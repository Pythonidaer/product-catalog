import React from 'react';

export default function ProductDetailsPage({ params }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Product details will go here */}
        <p>Product ID: {params.id}</p>
      </div>
    </main>
  );
}
