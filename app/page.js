export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Environment variable
  const res = await fetch(`${API_URL}/api/products`); // Dynamic URL
  const products = await res.json();

  return (
    <div>
      <h1>Product Catalog</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}: ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}
