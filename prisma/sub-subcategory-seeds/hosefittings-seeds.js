const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const hosefittingsSubcategories = [
  {
      "name": "Hose",
      "slug": "hose"
  },
  // Industrial Cat
  // {
  //     "name": "Hose Fittings",
  //     "slug": "hose-fittings"
  // }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Hose Fittings Subcategory ID
  const hosefittingsCategory = await prisma.category.findUnique({
    where: { slug: "hose-fittings" },
});

  if (hosefittingsCategory) {

    await prisma.category.createMany({
      data: hosefittingsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: hosefittingsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(hosefittingsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
