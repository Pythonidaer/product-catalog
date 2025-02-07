const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const zoningSubcategories = [
  {
      "name": "Air Dampers",
      "slug": "air-dampers"
  },
  {
      "name": "HVAC Zoning Panels",
      "slug": "hvac-zoning-panels"
  },
  {
      "name": "HVAC Zoning Accessories",
      "slug": "hvac-zoning-accessories"
  },
  {
      "name": "HVAC Zoning Replacement Parts",
      "slug": "hvac-zoning-replacement-parts"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Zoning Subcategory ID
  const zoningCategory = await prisma.category.findUnique({
    where: { slug: "zoning" },
  });

  if (zoningCategory) {

    await prisma.category.createMany({
      data: zoningSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: zoningCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(zoningSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
