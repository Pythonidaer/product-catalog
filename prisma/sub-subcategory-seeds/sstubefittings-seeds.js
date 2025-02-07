const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const sstubefittingsSubcategories = [
  {
      "name": "Sanitary Tubing & Fittings",
      "slug": "sanitary-tubing-and-fittings"
  },
  {
      "name": "SS Tubing",
      "slug": "import-304-seamless-tubing"
  },
  {
      "name": "SS Tube Fittings",
      "slug": "tube-and-tube-fittings"
  },
  {
      "name": "Tube End Valves",
      "slug": "tube-end-ball-valve"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Stainless Steal Tube Fittings Subcategory ID
  const sstubeefittingsCategory = await prisma.category.findUnique({
    where: { slug: "ss-tube-fittings" },
});

  if (sstubeefittingsCategory) {

    await prisma.category.createMany({
      data: sstubefittingsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: sstubeefittingsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(sstubefittingsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
