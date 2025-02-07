const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const hydronicSubcategories = [
  {
      name: "Hydronic Panel Radiators",
      slug: "hydronic-panel-radiators"
  },
  {
      name: "Hydronic Towel Warmers",
      slug: "hydronic-towel-warmers"
  },
  {
      name: "Hydronic Panel Radiator Accessories",
      slug: "hydronic-panel-radiator-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Hydronic Panel Radiators Subcategory ID
  const hydronicCategory = await prisma.category.findUnique({
    where: { slug: "hydronic-panel-radiator" },
  });

  if (hydronicCategory) {

    await prisma.category.createMany({
      data: hydronicSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: hydronicCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(hydronicSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
