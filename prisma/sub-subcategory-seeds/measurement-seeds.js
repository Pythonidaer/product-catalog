const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const measurementSubcategories = [
  {
      "name": "Gauges",
      "slug": "gauges"
  },
  {
      "name": "Gauge Accessories",
      "slug": "gauge-accessories"
  },
  {
      "name": "Thermometers",
      "slug": "industrial-thermometers"
  },
  {
      "name": "Thermowells",
      "slug": "industrial-thermowells"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Measurement Subcategory ID
  const measurementCategory = await prisma.category.findUnique({
    where: { slug: "measurement" },
});

  if (measurementCategory) {

    await prisma.category.createMany({
      data: measurementSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: measurementCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(measurementSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
