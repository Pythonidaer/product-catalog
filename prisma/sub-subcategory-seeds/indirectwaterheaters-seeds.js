const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const indirectwaterheatersSubcategories = [
  // Appears in Heating Cat and Waterheater Subcat
  // {
  //     name: "Indirect Water Heaters",
  //     slug: "indirect-water-heaters"
  // },
  {
      name: "Indirect Parts & Accessories",
      slug: "indirect-parts-and-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Indirect Water Heaters Subcategory ID
  const indirectwaterheatersCategory = await prisma.category.findUnique({
    where: { slug: "indirect-water-heaters" },
  });

  if (indirectwaterheatersCategory) {

    await prisma.category.createMany({
      data: indirectwaterheatersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: indirectwaterheatersCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(indirectwaterheatersSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
