const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Pipe Fittings Category ID
  const pipefittingsCategory = await prisma.category.findUnique({
    where: { slug: "main-fittings" },
  });

  if (pipefittingsCategory) {
    const pipefittingSubcategories = [
      {
          name: "ABS Fittings",
          slug: "abs-fittings"
      },
      {
          name: "Malleable Fittings",
          slug: "black-fittings"
      },
      {
          name: "Brass Fittings",
          slug: "brass-fittings"
      },
      {
          name: "Cast Iron Fittings",
          slug: "cast-iron-fittings"
      },
      {
          name: "Copper Fittings",
          slug: "copper-fittings"
      },
      {
          name: "Galvanized Fittings",
          slug: "galvanized-fittings"
      },
      {
          name: "Dielectric Fittings",
          slug: "dielectric-fittings"
      },
      {
          name: "Grooved Fittings",
          slug: "ductile-iron-fittings"
      },
      {
          name: "Plastic Fittings",
          slug: "plastic-fittings"
      },
      {
          name: "Stainless Fittings",
          slug: "stainless-fittings"
      },
      {
          name: "WROT Steel Fittings",
          slug: "steel-fittings"
      },
      {
          name: "Nipples",
          slug: "nipples"
      },
      {
          name: "Steel Weld Fittings",
          slug: "carbon-steel-fittings"
      },
      {
          name: "Forge Steel Fittings",
          slug: "forge-steel-fittings"
      },
      {
          name: "CSST Fittings",
          slug: "tracpipe-fittings"
      },
      {
          name: "Underground Gas",
          slug: "underground-gas"
      }
  ];

    await prisma.category.createMany({
      data: pipefittingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: pipefittingsCategory.id,
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
