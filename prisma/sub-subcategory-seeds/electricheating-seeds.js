const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const electricheatingSubcategories = [
  {
      name: "Baseboard Radiators",
      slug: "electric-baseboard"
  },
  {
      name: "Heating Accessories",
      slug: "electric-heating-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Electric Heating Subcategory ID
  const electricheatingCategory = await prisma.category.findUnique({
    where: { slug: "electric-heating" },
  });

  if (electricheatingCategory) {

    await prisma.category.createMany({
      data: electricheatingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: electricheatingCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(electricheatingSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
