const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Reset DB and Seed Data before all tests
beforeAll(async () => {
  console.log("🔄 Resetting test database...");

  // ✅ Clear existing data first
  await prisma.$transaction([
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.brand.deleteMany(),
  ]);

  console.log("✅ Database cleared. Seeding new data...");

  // ✅ Create shared test data
  await prisma.category.create({ data: { id: 1, name: "Test Category" } });
  await prisma.brand.create({ data: { id: 1, name: "Test Brand" } });

  await prisma.product.create({
    data: {
      id: 1,
      name: "Test Product",
      description: "Test Description",
      price: 99.99,
      categoryId: 1, // ✅ Uses existing category
      brandId: 1, // ✅ Uses existing brand
    },
  });

  console.log("✅ Test data seeded.");
});

// ✅ Close Prisma connection after all tests
afterAll(async () => {
  console.log("🛑 Closing database connection...");
  await prisma.$disconnect();
});

module.exports = prisma;
