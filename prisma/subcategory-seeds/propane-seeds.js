const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Propane Category ID
  const propaneCategories = await prisma.category.findUnique({
    where: { slug: "main-propane" },
  });

  if (propaneCategories) {
    const propaneSubcategories = [
      {
          name: "Generators",
          slug: "generators"
      },
      {
          name: "Hearth Equipment",
          slug: "hearth-equipment"
      },
      {
          name: "Outdoor Living",
          slug: "outdoor-living"
      },
      {
          name: "Commercial",
          slug: "propane-commercial"
      },
      {
          name: "Regulators",
          slug: "regulators"
      },
      {
          name: "Tank/Cylinders",
          slug: "tanks-cylinders"
      },
      {
          name: "Off-Grid Equipment",
          slug: "propane-off-grid-equipment"
      }
  ];

    await prisma.category.createMany({
      data: propaneSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: propaneCategories.id,
      })),
    });
  }

  console.log("✅ Subcategories seeded successfully!");
}

seedSubcategories()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
