const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Pumps Plumbing Subcategory ID
  const pumpsplumbingCategory = await prisma.category.findUnique({
    where: { slug: "pumps-plumbing" },
  });

  if (pumpsplumbingCategory) {
    const pumpsplumbingSubcategories = [
      {
          name: "Circulator",
          slug: "circulator-pumps"
      },
      {
          name: "Macerating",
          slug: "macerating-pumps"
      },
      {
          name: "Grinder",
          slug: "grinder-pumps"
      },
      {
          name: "Sewage & Effluent",
          slug: "sewage-and-effluent-pumps"
      },
      {
          name: "Sump",
          slug: "sump-pumps"
      },
      {
          name: "Other",
          slug: "other-pumps"
      }
  ];

    await prisma.category.createMany({
      data: pumpsplumbingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: pumpsplumbingCategory.id,
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
