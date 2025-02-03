const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Populate database with initial data
async function main() {
  console.log("🔄 Resetting database...");

  // ✅ Delete data in the correct order to prevent foreign key errors
  await prisma.$transaction([
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.brand.deleteMany(),
  ]);

  console.log("✅ Database cleared. Seeding new data...");

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
      { name: "Product 1", description: "Description 1", price: 10.99, categoryId: 12, brandId: 12 },
      { name: "Product 2", description: "Description 2", price: 19.99, categoryId: 13, brandId: 13},
    ],
  });

  console.log("Database seeded!");
}

main()
  .then(() => console.log("Database seeded successfully"))
  .catch((e) => console.error("❌ Seeding failed:", e))
  .finally(async () => await prisma.$disconnect());