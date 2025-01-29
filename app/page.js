export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Backend API URL
  const testRes = await fetch(`${API_URL}/test`);
  const testMessage = await testRes.text();

  const productsRes = await fetch(`${API_URL}/api/products`);
  const products = await productsRes.json();

  return (
    <div>
      <h1>Product Catalog</h1>
      <p>Test Route Message: {testMessage}</p>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}: ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}