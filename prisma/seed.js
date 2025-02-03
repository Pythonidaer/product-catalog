const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Populate database with initial data
async function main() {
  // Seed categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Plumbing" },
      { name: "Heating" },
      { name: "HVAC" },
    ],
  });

  // Seed brands
  const brands = await prisma.brand.createMany({
    data: [
      { name: "Brand A" },
      { name: "Brand B" },
      { name: "Brand C" },
    ],
  });

  // Seed products
  const products = await prisma.product.createMany({
    data: [
      { name: "Product 1", description: "Description 1", price: 10.99, categoryId: 1, brandId: 1 },
      { name: "Product 2", description: "Description 2", price: 19.99, categoryId: 2, brandId: 2 },
    ],
  });

  console.log("Database seeded!");
}

main()
  .then(() => console.log("Database seeded successfully"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());