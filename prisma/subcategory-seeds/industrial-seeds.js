const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Industrial Equipment Category ID
  const industrialCategory = await prisma.category.findUnique({
    where: { slug: "main-industrial" },
  });

  if (industrialCategory) {
    const industrialSubcategories = [
      {
          name: "Automated Valves",
          slug: "valves-automation"
      },
      {
          name: "Expansion Joints",
          slug: "flexible-connectors"
      },
      {
          name: "Filtration",
          slug: "pipe-line-strainers"
      },
      {
          name: "Hose & Fittings",
          slug: "hose-fittings"
      },
      {
          name: "Manual Valves",
          slug: "valves-manual"
      },
      {
          name: "Measurement",
          slug: "measurement"
      },
      {
          name: "SS Tube & Fittings",
          slug: "ss-tube-fittings"
      },
      {
          name: "Steam",
          slug: "steam"
      }
  ];

    await prisma.category.createMany({
      data: industrialSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: industrialCategory.id,
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
