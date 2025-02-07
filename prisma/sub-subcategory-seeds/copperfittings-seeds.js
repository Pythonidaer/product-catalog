
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Copper Fittings Subcategory ID
  const copperfittingsSubcategories = await prisma.category.findUnique({
    where: { slug: "copper-fittings" },
  });

  if (copperfittingsSubcategories) {
    const copperfittingsSubcategories = [
        {
            "name": "Sweat Fittings",
            "slug": "copper-fittings-solder"
        },
        {
            "name": "Press Fittings",
            "slug": "copper-press-fittings"
        },
        // Refrigeration Subcat
        // {
        //     "name": "Refrigerant Press Fittings",
        //     "slug": "refrigeration-press-fittings"
        // },
        {
            "name": "ACR Fittings",
            "slug": "acr-fittings"
        },
        {
            "name": "DWV Fittings",
            "slug": "dwv-copper-fittings"
        },
        {
            "name": "Monoflow Fittings",
            "slug": "monoflo-fittings"
        },
        {
            "name": "Press Gas Fittings",
            "slug": "press-fittings"
        },
        {
            "name": "Oxygen Cleaned Fittings",
            "slug": "oxygen-cleaned-fittings"
        }
    ];

    await prisma.category.createMany({
      data: copperfittingsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: copperfittingsSubcategories.id,
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
