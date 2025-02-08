import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function LandingPage({ params }) {
  const { slug } = params;

  // Fetch the current category and check if it exists
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return <h1>404 - Page Not Found</h1>;
  }

  // Fetch subcategories of the current category
  const subcategories = await prisma.category.findMany({
    where: { parentId: category.id },
    include: { Subcategories: true }, // Include nested subcategories to check for additional layers
  });

  return (
    <div>
      <h1>{category.name}</h1>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.slug}>
            {/* Dynamically determine the URL */}
            <a
              href={
                subcategory.Subcategories.length > 0
                  ? `/landing/${subcategory.slug}` // If the subcategory has further subcategories
                  : `/category/${subcategory.slug}` // If the subcategory contains products only
              }
            >
              {subcategory.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  // Fetch all categories to generate static params
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  return categories.map((category) => ({
    slug: category.slug,
  }));
}
