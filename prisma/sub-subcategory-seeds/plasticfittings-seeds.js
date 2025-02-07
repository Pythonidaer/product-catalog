

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Plastic Fittings Subcategory ID
  const plasticfittingsCategory = await prisma.category.findUnique({
    where: { slug: "plastic-fittings" },
  });

  if (plasticfittingsCategory) {
    const plasticfittingsSubcategories = [
        {
            "name": "PVC DWV Fittings",
            "slug": "dwv-plastic-fittings"
        },
        {
            "name": "PVC Schedule 40 Fittings",
            "slug": "sch40-pressure-fittings"
        },
        {
            "name": "PVC Schedule 80 Fittings",
            "slug": "shc80-pressure-fittings"
        },
        {
            "name": "CPVC CTS Fittings",
            "slug": "cts-cpvc-fittings"
        },
        {
            "name": "CPVC 80 Fittings",
            "slug": "cpvc-fittings"
        },
        {
            "name": "Sewer & Drain Fittings",
            "slug": "sewer-and-drain-fittings"
        },
        {
            "name": "PVC Insert Fittings",
            "slug": "pvc-insert-fittings"
        },
        {
            "name": "Pex Fittings",
            "slug": "plastic-pex-fittings"
        }
    ];

    await prisma.category.createMany({
      data: plasticfittingsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: plasticfittingsCategory.id,
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
