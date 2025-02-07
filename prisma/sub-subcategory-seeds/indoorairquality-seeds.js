const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const indoorairqualitySubcategories = [
  {
      "name": "Air Cleaners",
      "slug": "air-cleaners"
  },
  {
      "name": "Air Purification Systems & Components",
      "slug": "air-purification-systems-and-components"
  },
  {
      "name": "Humidifiers",
      "slug": "humidifiers"
  },
  {
      "name": "Dehumidifiers",
      "slug": "dehumidifiers"
  },
  {
      "name": "Air Filters",
      "slug": "air-filters"
  },
  {
      "name": "Energy & Heat Recovery Units",
      "slug": "energy-and-heat-recovery-units"
  },
  {
      "name": "UV Lights",
      "slug": "uv-lights"
  },
  {
      "name": "Exhaust Fans",
      "slug": "exhaust-fans"
  },
  {
      "name": "Other Indoor Air Quality Products",
      "slug": "other-indoor-air-quality-products"
  },
  {
      "name": "Replacement Accessories",
      "slug": "replacement-accessories"
  },
  {
      "name": "Replacement Filters",
      "slug": "replacement-filters"
  },
  {
      "name": "Humidity Sensors",
      "slug": "humidity-sensors"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Indoor Air Quality Subcategory ID
  const indoorairqualityCategory = await prisma.category.findUnique({
    where: { slug: "indoor-air-quality" },
  });

  if (indoorairqualityCategory) {

    await prisma.category.createMany({
      data: indoorairqualitySubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: indoorairqualityCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(indoorairqualitySubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
