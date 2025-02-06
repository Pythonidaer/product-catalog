const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Faucets Category ID
  const faucetsCategory = await prisma.category.findUnique({
    where: { slug: "sinks" },
  });

  if (faucetsCategory) {
    const faucetsSubcategories = [];

    await prisma.category.createMany({
      data: faucetsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: faucetsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
