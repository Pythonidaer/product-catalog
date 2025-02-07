const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Underground Gas Subcategory ID
  const undergroundgasCategory = await prisma.category.findUnique({
    where: { slug: "underground-gas" },
  });

  if (undergroundgasCategory) {
    const undergroundgasSubcategories = [
        {
            "name": "Gas Risers",
            "slug": "gas-risers"
        },
        {
            "name": "Gas Flex Risers",
            "slug": "gas-flex-risers"
        },
        {
            "name": "Gas Transitions",
            "slug": "gas-transitions"
        },
        {
            "name": "Gas Mechanical Fittings",
            "slug": "gas-mechanical-fittings"
        }
    ];

    await prisma.category.createMany({
      data: undergroundgasSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: undergroundgasCategory.id,
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
