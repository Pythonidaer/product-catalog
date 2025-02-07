const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const furnacesSubcategories = [
  {
      "name": "Gas Furnaces 80% Efficient",
      "slug": "gas-furnaces-80-efficient"
  },
  {
      "name": "Gas Furnaces 90% Plus High Efficiency",
      "slug": "gas-furnaces-90-plus-high-efficiency"
  },
  {
      "name": "Furnaces - Oil",
      "slug": "furnaces---oil"
  },
  {
      "name": "Mobile Home Furnaces",
      "slug": "mobile-home-furnaces"
  },
  {
      "name": "Furnace Accessories",
      "slug": "furnace-accessories"
  },
  {
      "name": "Furnace Parts",
      "slug": "furnace-parts"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Furnaces Subcategory ID
  const furnacesCategory = await prisma.category.findUnique({
    where: { slug: "indoor-air-quality" },
  });

  if (furnacesCategory) {

    await prisma.category.createMany({
      data: furnacesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: furnacesCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(furnacesSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
