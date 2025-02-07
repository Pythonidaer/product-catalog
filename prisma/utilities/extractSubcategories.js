// Find Subcategories on fwwebb.com landing pages:
const subcategories = [];

document.querySelectorAll(".cat-box-landing > a").forEach((el) => {
  const nameElement = el.querySelector("p.cat-item-p-wo");
  const href = el.getAttribute("href");

  if (nameElement && href) {
    const name = nameElement.textContent.trim();
    let slug;

    if (href.startsWith("/landing/")) {
      // Extract slug from /landing/ URLs
      slug = href.replace("/landing/", "").replace(".php", "");
    } else if (href.startsWith("/category/")) {
      // Extract slug from /category/<...>/<slug>/ URLs
      const parts = href.split("/").filter(Boolean); // Filter removes empty segments
      slug = parts[parts.length - 1].replace(/\/$/, ""); // Get the last segment and remove trailing slash
    }

    if (name && slug) {
      subcategories.push({ name, slug });
    }
  }
});

console.log(subcategories);