const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const outdoorlivingSubcategories = [
  {
      "name": "Grills Built-In",
      "slug": "grills-built-in"
  },
  {
      "name": "Grills Portable",
      "slug": "grills-portable"
  },
  {
      "name": "Grill Accessories",
      "slug": "grill-accessories"
  },
  {
      "name": "Grill Parts",
      "slug": "grill-parts"
  },
  {
      "name": "Patio Heaters",
      "slug": "patio-heaters"
  },
  {
      "name": "Pool Heaters",
      "slug": "pool-heaters"
  },
  {
      "name": "Firepits",
      "slug": "firepits"
  },
  {
      "name": "Timers",
      "slug": "timers"
  },
  {
      "name": "Fire Tables",
      "slug": "fire-tables"
  },
  {
      "name": "Urns/bowls",
      "slug": "urns-bowls"
  },
  {
      "name": "Lanterns",
      "slug": "lanterns"
  },
  {
      "name": "Fireplaces",
      "slug": "fireplaces"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Outdoor Living Subcategory ID
  const outdoorlivingCategory = await prisma.category.findUnique({
    where: { slug: "outdoor-living" },
});

  if (outdoorlivingCategory) {

    await prisma.category.createMany({
      data: outdoorlivingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: outdoorlivingCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(outdoorlivingSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
