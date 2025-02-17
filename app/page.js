import React from "react";
import brands from "./data/brands";

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

  const departments = [
    { name: 'Plumbing', href: '/landing/main-plumbing', image: '/departments/front-page-plumbing.webp' },
    { name: 'Heating', href: '/landing/main-heating', image: '/departments/front-page-heating.webp' },
    { name: 'HVAC/R', href: '/landing/main-hvacr', image: '/departments/front-page-hvac.webp' },
    { name: 'Pipe & Tube', href: '/landing/main-pipe', image: '/departments/front-page-pipe.webp' },
    { name: 'Valves', href: '/landing/main-valves', image: '/departments/front-page-valves.webp' },
    { name: 'Fittings', href: '/landing/main-fittings', image: '/departments/front-page-fittings.webp' },
    { name: 'Hangers', href: '/landing/main-hangers', image: '/departments/front-page-hangers.webp' },
    { name: 'Electrical', href: '/landing/main-electrical', image: '/departments/front-page-electrical.webp' },
    { name: 'Tools', href: '/landing/main-tools', image: '/departments/front-page-tools-2.webp' },
    { name: 'Safety', href: '/landing/main-safety', image: '/departments/front-page-safety.webp' },
  ];


  return (
    <>
      <main className="container">
        <section className="departments-container">
          <div className="departments-grid" role="list">
            {departments.map((department) => (
              <div key={department.name} className="department-item" role="listitem">
                <a href={department.href} className="department-link">
                  <img
                    src={department.image}
                    alt={department.name}
                    width="100"
                    height="100"
                    loading="lazy"
                  />
                  <p className="department-name">{department.name}</p>
                </a>
              </div>
            ))}
          </div>
        </section>

      {/*}   <h1>Products</h1>
        <ul className="products-list">
          {products && products.length > 0 ? (
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
        </ul> */}

        <section className="brands-container">
          <h2>Top Brands</h2>
          <div className="brands-grid" role="list">
            {brands.map((brand) => (
              <div key={brand.name} className="brand-item" role="listitem">
                <a href={brand.href} className="brand-link" aria-label={brand.name}>
                  <img
                    className="brand-img bw-logo"
                    src={brand.image}
                    alt={brand.name}
                    width="193"
                    height="118"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
          <a href="/brands" className="see-all-brands">
            See All Brands
          </a>
        </section>
      </main>

      <section className="projects-section">
        <div className="projects-grid">
          <div className="project-item">
            <div className="project-card">
              <h3 className="project-title">New Portfolio</h3>
              <div className="project-image-wrapper">
                <img 
                  src="/portfolio/portfolio.jpg" 
                  alt="New Portfolio" 
                  className="project-image"
                />
              </div>
              <a href="https://jonathan-hammond.vercel.app/" target="_blank" className="project-link">Learn More</a>
            </div>
          </div>

          <div className="project-item">
            <div className="project-card">
              <h3 className="project-title">Sitemap Search</h3>
              <div className="project-image-wrapper">
                <img 
                  src="/portfolio/sitemap.jpg" 
                  alt="Sitemap Search" 
                  className="project-image"
                />
              </div>
              <a href="https://pythonidaer.github.io/neumorphic-sitemap-search/" target="_blank" className="project-link">Learn More</a>
            </div>
          </div>

          <div className="project-item">
            <div className="project-card">
              <h3 className="project-title">Sports Analytics</h3>
              <div className="project-image-wrapper">
                <img 
                  src="/portfolio/analytics.jpg" 
                  alt="Sports Analytics" 
                  className="project-image"
                />
              </div>
              <a href="https://sports-analytics-demo.netlify.app/" target="_blank" className="project-link">Learn More</a>
            </div>
          </div>

          <div className="project-item">
            <div className="project-card">
              <h3 className="project-title">Old Portfolio</h3>
              <div className="project-image-wrapper">
                <img 
                  src="/portfolio/portfolio-old.jpg" 
                  alt="Old Portfolio" 
                  className="project-image"
                />
              </div>
              <a href="https://pythonidaer.github.io/jonnovative-portfolio/" target="_blank" className="project-link">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}