const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Dispenser Soap Subcategory ID
  const brassfittingsCategory = await prisma.category.findUnique({
    where: { slug: "brass-fittings" },
  });

  if (brassfittingsCategory) {
    const brassfittingsSubcategories =
    [
        {
            "name": "Compression Fittings",
            "slug": "compression-fittings"
        },
        {
            "name": "Flare Fittings",
            "slug": "flare-tube-fittings"
        },
        // Fittings Cat
        // {
        //     "name": "Threaded Fittings",
        //     "slug": "brass-fittings"
        // },
        {
            "name": "Pex Fittings",
            "slug": "brass-pex-fittings"
        },
        {
            "name": "Push Fittings",
            "slug": "quick-connect-fittings"
        }
    ]

    await prisma.category.createMany({
      data: brassfittingsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: brassfittingsCategory.id,
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
