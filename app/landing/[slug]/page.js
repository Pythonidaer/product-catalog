import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";
import "../../styles/LandingPage.css"

const prisma = new PrismaClient();

export default async function LandingPage({ params }) {
  const { slug } = params;

  // Fetch the current category
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return <h1 className="category-page-header">404 - Page Not Found</h1>;
  }

  // Fetch subcategories
  const subcategories = await prisma.category.findMany({
    where: { parentId: category.id },
    include: { Subcategories: true }, // Include nested subcategories
  });

  return (
    <div className="container">
      {/* Category Header */}
      <h1 className="category-page-header">{category.name}</h1>

      {/* Grid Layout */}
      <div className="subcategory-grid">
        {subcategories.map((subcategory) => (
          <a
            key={subcategory.slug}
            href={
              subcategory.Subcategories.length > 0
                ? `/landing/${subcategory.slug}`
                : `/category/${subcategory.slug}`
            }
            className="subcategory-card"
          >
            <p>{subcategory.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  return categories.map((category) => ({
    slug: category.slug,
  }));
}
