const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const regulatorsSubcategories = [
  {
      "name": "LP Regulators",
      "slug": "lp-regulators"
  },
  {
      "name": "Commercial Regulators",
      "slug": "commercial-regulators"
  },
  {
      "name": "Line pressure",
      "slug": "line-pressure-regulators"
  },
  {
      "name": "OPD Line pressure",
      "slug": "opd-line-pressure-regulators"
  },
  {
      "name": "Appliance",
      "slug": "appliance"
  },
  {
      "name": "Regulator Accessories",
      "slug": "gas-regulator-accessories"
  },
  {
      "name": "Pigtails, Hogtails, POL Adapters",
      "slug": "pigtails"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Regulators Subcategory ID
  const regulatorsCategory = await prisma.category.findUnique({
    where: { slug: "regulators" },
});

  if (regulatorsCategory) {

    await prisma.category.createMany({
      data: regulatorsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: regulatorsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(regulatorsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
