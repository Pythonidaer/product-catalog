const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const propaneoffgridequipmentSubcategories = [
  {
      "name": "Refrigerators",
      "slug": "refrigerators"
  },
  {
      "name": "Ranges",
      "slug": "ranges"
  },
  {
      "name": "Freezers",
      "slug": "freezers"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Propane Offgrid Equipment Subcategory ID
  const propaneoffgridequipmentCategories = await prisma.category.findUnique({
    where: { slug: "propane-off-grid-equipment" },
});

  if (propaneoffgridequipmentCategories) {

    await prisma.category.createMany({
      data: propaneoffgridequipmentSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: propaneoffgridequipmentCategories.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(propaneoffgridequipmentSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
