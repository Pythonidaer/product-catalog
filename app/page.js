import React from "react";

export default async function ProductListingPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  let products = [];
  try {
    const productsRes = await fetch(`${API_URL}/api/products`, {
      cache: "no-store", // Prevents caching for fresh data on every request
    });
    console.log("API_URL:", API_URL);
    console.log("Fetch response:", productsRes.status); // Check full response
    console.log("Response Headers:", productsRes.headers);

    if (!productsRes.ok) {
      throw new Error("Failed to fetch products");
    }
    products = await productsRes.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="container">
      <h1>Products</h1>
      {/* <ul>
        <li>
          <a href="#">Shop All Depts</a>
          <section>
            <ul>
              <li>
                <a href="/landing/main-plumbing">Plumbing</a>
              </li>
              <li>
                <a href="/landing/main-heating">Heating</a>
              </li>
              <li>
                <a href="/landing/main-hvacr">HVAC/R</a>
              </li>
              <li>
                <a href="/landing/main-propane">Propane</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/landing/main-pipe">Pipe & Tube</a>
              </li>
              <li>
                <a href="/landing/main-electrical">Electrical</a>
              </li>
              <li>
                <a href="/landing/fire-protection">Fire Protection</a>
              </li>
              <li>
                <a href="/landing/main-fittings">Fittings</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/landing/main-hangers">Hangers</a>
              </li>
              <li>
                <a href="/landing/main-hardware">Hardware</a>
              </li>
              <li>
                <a href="/landing/main-industrial">Industrial</a>
              </li>
              <li>
                <a href="/landing/main-safety">Safety</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/landing/specialties">Specialties</a>
              </li>
              <li>
                <a href="/landing/main-tools">Tools</a>
              </li>
              <li>
                <a href="/landing/main-valves">Valves</a>
              </li>
              <li>
                <a href="/landing/well-systems">Well Systems</a>
              </li>
            </ul>
          </section>
        </li>
      </ul> */}

      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <a href={`/product/${product.id}`}>
                {product.name}: ${product.price}
              </a>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </main>
  );
}