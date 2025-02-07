const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const spaceheatersSubcategories = [
  {
      name: "Direct Vent Standard Efficiency",
      slug: "space-heaters-direct-vent-standard-efficiency"
  },
  {
      name: "Direct Vent Mid Efficiency (80's)",
      slug: "direct-vent-mid-efficiency-80"
  },
  {
      name: "Direct Vent High Efficiency (90's)",
      slug: "direct-vent-high-efficiency-90"
  },
  {
      name: "Vent Free",
      slug: "vent-free"
  },
  {
      name: "Forced Air",
      slug: "forced-air"
  },
  {
      name: "Tent Heaters",
      slug: "tent-heaters"
  },
  {
      name: "Convection Heaters",
      slug: "convection-heaters"
  },
  {
      name: "Radiant Heaters",
      slug: "radiant-heaters"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Space Heaters Subcategory ID
  const spaceheatersCategory = await prisma.category.findUnique({
    where: { slug: "space-heaters" },
  });

  if (spaceheatersCategory) {

    await prisma.category.createMany({
      data: spaceheatersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: spaceheatersCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(spaceheatersSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
