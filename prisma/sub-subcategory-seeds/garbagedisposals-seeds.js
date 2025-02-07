const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const garbagedisposalsSubcategories = [
  // Unique Scenario - self-referencing in a sense
  // {
  //     "name": "Garbage Disposals",
  //     "slug": "garbage-disposals"
  // },
  {
      "name": "Garbage Disposal Accessories",
      "slug": "garbage-disposal-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Garbage Disposals Subcategory ID
  const garbagedisposalsCategory = await prisma.category.findUnique({
    where: { slug: "garbage-disposals" },
  });

  if (garbagedisposalsCategory) {

    await prisma.category.createMany({
      data: garbagedisposalsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: garbagedisposalsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
.catch(async (e) => {
  console.error("❌ Seeding failed: ", e);
  const duplicates = await findDuplicateSlugs(garbagedisposalsSubcategories);
  console.error("Duplicates identified on failure:", duplicates);
})
  .finally(async () => {
    await prisma.$disconnect();
  });
