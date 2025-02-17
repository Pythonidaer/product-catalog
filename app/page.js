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

  const brands = [
    { name: 'Charlotte Pipe', href: '/shop/charlotte', image: '/brands/CharlottePipe.webp' },
    { name: 'Delta Faucet', href: '/shop/delta', image: '/brands/Delta.webp' },
    { name: 'Ideal', href: '/shop/ideal', image: '/brands/Ideal.webp' },
    { name: 'Milwaukee', href: '/shop/milwaukee-tools', image: '/brands/Milwaukee.webp' },
    { name: 'Navien', href: '/shop/navien', image: '/brands/NAV-Logo.webp' },
    { name: 'Oatey', href: '/shop/oatey', image: '/brands/Oatey.webp' },
    { name: 'American Standard', href: '/shop/american-standard', image: '/brands/american-standard.webp' },
    { name: 'Amtrol', href: '/shop/amtrol', image: '/brands/amtrol.webp' },
    { name: 'Apollo', href: '/shop/apollo', image: '/brands/apollo-valves.webp' },
    { name: 'Burnham', href: '/shop/burnham', image: '/brands/burnham.webp' },
    { name: 'Caleffi', href: '/shop/caleffi', image: '/brands/caleffi.webp' },
    { name: 'Elkay', href: '/shop/elkay', image: '/brands/elkay.webp' },
    { name: 'Georg Fischer', href: '/shop/georg-fischer', image: '/brands/georg-fischer.webp' },
    { name: 'Gerber', href: '/shop/gerber', image: '/brands/gerber.webp' },
    { name: 'Lochinvar', href: '/shop/lochinvar', image: '/brands/lochinvar.webp' },
    { name: 'Modine', href: '/shop/modine', image: '/brands/modine.webp' },
    { name: 'Moen', href: '/shop/moen', image: '/brands/moen.webp' },
    { name: 'Nibco', href: '/shop/nibco', image: '/brands/nibco.webp' },
    { name: 'PurePro', href: '/shop/purepro', image: '/brands/pure-pro.webp' },
    { name: 'RLS', href: '/shop/rls', image: '/brands/rapid-locking-system.webp' },
    { name: 'Resideo', href: '/shop/resideo', image: '/brands/resideo.webp' },
    { name: 'Rheem', href: '/shop/rheem', image: '/brands/rheem.webp' },
    { name: 'Samsung', href: '/shop/samsung', image: '/brands/samsung.webp' },
    { name: 'Symmons', href: '/shop/symmons', image: '/brands/symmons.webp' },
    { name: 'Taco', href: '/shop/taco', image: '/brands/taco.webp' },
    { name: 'Toto', href: '/shop/toto', image: '/brands/toto.webp' },
    { name: 'Watts', href: '/shop/watts', image: '/brands/watts.webp' },
    { name: 'Weil McLain', href: '/shop/weil-mclain', image: '/brands/weil-mclain.webp' },
    { name: 'Worthington', href: '/shop/worthington', image: '/brands/worthington.webp' }
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
                    className="bw-logo"
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