const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Faucets Category ID
  const toileturinalinstallationsCategory = await prisma.category.findUnique({
    where: { slug: "toilet-urinal-installation" },
  });

  if (toileturinalinstallationsCategory) {
    const toileturinalinstallationsSubcategories = [
      {
          name: "Closet Flanges",
          slug: "closet-flanges"
      },
      {
          name: "Closet Bolts, Wax Rings & Seals",
          slug: "closet-bolts-wax-rings-and-seals"
      }
  ];

    await prisma.category.createMany({
      data: toileturinalinstallationsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: toileturinalinstallationsCategory.id,
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
