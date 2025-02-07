const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const boilersSubcategories = [
  {
      name: "Residential Oil Boilers",
      slug: "residential-oil-boilers"
  },
  {
      name: "Residential Gas Combi Boilers - High Efficiency",
      slug: "residential-gas-combi-boilers---high-efficiency"
  },
  {
      name: "Residential Gas Boilers - High Efficiency",
      slug: "residential-gas-boilers---high-efficiency"
  },
  {
      name: "Residential Gas Boilers - Standard Efficiency",
      slug: "residential-gas-boilers---standard-efficiency"
  },
  {
      name: "Commercial Gas Boilers",
      slug: "commercial-gas-boilers"
  },
  {
      name: "Commercial Oil Boilers",
      slug: "commercial-oil-boilers"
  },
  {
      name: "Boiler Accessories",
      slug: "boilers-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Boilers Subcategory ID
  const boilersCategory = await prisma.category.findUnique({
    where: { slug: "boilers" },
  });

  if (boilersCategory) {

    await prisma.category.createMany({
      data: boilersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: boilersCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(boilersSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
