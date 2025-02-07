const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const blacksteelpipeSubcategories = [
    {
        "name": "Domestic Pipe",
        "slug": "steel-pipe"
    },
    // Pipe and Tube Cat
    // {
    //     "name": "Import Pipe",
    //     "slug": "black-steel-pipe"
    // }
]
async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Black Steel Pipe Subcategory ID
  const blacksteelpipeCategory = await prisma.category.findUnique({
    where: { slug: "black-steel-pipe" },
  });

  if (blacksteelpipeCategory) {

    await prisma.category.createMany({
      data: blacksteelpipeSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: blacksteelpipeCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(blacksteelpipeSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
