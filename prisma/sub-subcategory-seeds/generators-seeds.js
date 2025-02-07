const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const generatorsSubcategories = [
  // All in Electrical Cat
  // {
  //     "name": "Standby Generators",
  //     "slug": "standby-generators"
  // },
  // {
  //     "name": "Transfer Switches",
  //     "slug": "transfer-switches"
  // },
  // {
  //     "name": "Standby Generator Accessories",
  //     "slug": "standby-generators-accessories"
  // },
  // {
  //     "name": "Portable Generators",
  //     "slug": "portable-generators"
  // },
  // {
  //     "name": "Portable Generator Accessories",
  //     "slug": "portable-generator-accessories"
  // }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Generators Subcategory ID
  const generatorsCategory = await prisma.category.findUnique({
    where: { slug: "generators" },
});

  if (generatorsCategory) {

    await prisma.category.createMany({
      data: generatorsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: generatorsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(generatorsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
