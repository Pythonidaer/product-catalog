const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Pipe Hangers Category ID
  const hangersCategory = await prisma.category.findUnique({
    where: { slug: "main-hangers" },
  });

  if (hangersCategory) {
    const hangersSubcategories = [
      {
          name: "Black Hangers",
          slug: "black-hangers"
      },
      {
          name: "Copper Hangers",
          slug: "copper-hangers"
      },
      {
          name: "Galvanized Hangers",
          slug: "galvanized-hangers"
      },
      {
          name: "Plastic Hangers",
          slug: "plastic-hangers"
      },
      {
          name: "Pex Hangers",
          slug: "pex-hangers"
      },
      {
          name: "Stainless Steel Hangers",
          slug: "stainless-steel-hangers"
      },
      {
          name: "Fire Protection Gaskets & Hangers",
          slug: "fire-protection-gaskets-and-hangers"
      },
      {
          name: "Seismic Hangers",
          slug: "seismic-hangers"
      },
      {
          name: "Insulation Shields",
          slug: "insulation-shields"
      },
      {
          name: "Pipe Supports",
          slug: "pipe-supports"
      },
      {
          name: "Strut Clamps",
          slug: "strut-clamps"
      }
  ];

    await prisma.category.createMany({
      data: hangersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: hangersCategory.id,
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
