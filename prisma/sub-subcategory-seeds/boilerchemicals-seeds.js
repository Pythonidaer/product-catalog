const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const boilerchemicalsSubcategories = [
  {
      name: "Inhibitors",
      slug: "inhibitors"
  },
  {
      name: "Boiler Treatment",
      slug: "boiler-treatment"
  },
  {
      name: "Boiler Cleaners",
      slug: "boiler-cleaners"
  },
  {
      name: "Boiler Antifreeze",
      slug: "boiler-antifreeze"
  },
  {
      name: "Boiler Sealant",
      slug: "boiler-sealant"
  },
  {
      name: "Fuel Oil Treatment",
      slug: "fuel-oil-treatment"
  },
  {
      name: "Absorbents",
      slug: "absorbants"
  },
  {
      name: "Test Strips",
      slug: "test-strips"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Boiler Chemicals Subcategory ID
  const boilerchemicalsCategory = await prisma.category.findUnique({
    where: { slug: "boiler-chemicals" },
  });

  if (boilerchemicalsCategory) {

    await prisma.category.createMany({
      data: boilerchemicalsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: boilerchemicalsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(boilerchemicalsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
