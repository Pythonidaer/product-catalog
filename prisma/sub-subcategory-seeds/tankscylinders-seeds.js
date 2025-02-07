const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const tankscylindersSubcategories = [
  {
      "name": "Prefilled Cylinders",
      "slug": "prefilled-cylinders"
  },
  {
      "name": "Small LP Cylinders",
      "slug": "propane-cylinders"
  },
  {
      "name": "Forklift Cylinders",
      "slug": "forklift-cylinders"
  },
  {
      "name": "Large LP Cylinders",
      "slug": "large-lp-cylinders"
  },
  {
      "name": "120 to 1990 LP Tanks",
      "slug": "120-1990-lp-tanks"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Tanks and Cylinders Subcategory ID
  const tankscylindersCategory = await prisma.category.findUnique({
    where: { slug: "tanks-cylinders" },
});

  if (tankscylindersCategory) {

    await prisma.category.createMany({
      data: tankscylindersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: tankscylindersCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(tankscylindersSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
