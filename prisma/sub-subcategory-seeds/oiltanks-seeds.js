const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const oiltanksSubcategories = [
  {
      name: "Steel Oil Tanks",
      slug: "steel-oil-tanks"
  },
  {
      name: "Double Wall Oil Tanks",
      slug: "double-wall-oil-tanks"
  },
  {
      name: "Ecoplus Oil Tanks",
      slug: "ecoplus-oil-tanks"
  },
  {
      name: "Skid Tanks",
      slug: "skid-tanks"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Oil Tanks Subcategory ID
  const oiltanksCategory = await prisma.category.findUnique({
    where: { slug: "oil-tanks" },
  });

  if (oiltanksCategory) {

    await prisma.category.createMany({
      data: oiltanksSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: oiltanksCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(oiltanksSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
