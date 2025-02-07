const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const aireliminationSubcategories = [
  {
      name: "Air & Dirt Separators",
      slug: "air-and-dirt-separators"
  },
  {
      name: "Air Separators",
      slug: "air-separators"
  },
  {
      name: "Dirt Separators",
      slug: "dirt-separators"
  },
  {
      name: "Magnetic & Dirt Separators",
      slug: "magnetic-and-dirt-separators"
  },
  {
      name: "Air Vents",
      slug: "air-vents"
  },
  {
      name: "Steam Vents",
      slug: "steam-vents"
  },
  {
      name: "Air Elimination Parts",
      slug: "air-elimination-parts"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Air Elimination Subcategory ID
  const aireliminationCategory = await prisma.category.findUnique({
    where: { slug: "air-elimination" },
  });

  if (aireliminationCategory) {

    await prisma.category.createMany({
      data: aireliminationSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: aireliminationCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(aireliminationSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
