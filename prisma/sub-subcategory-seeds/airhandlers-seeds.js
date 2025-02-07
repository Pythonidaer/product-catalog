const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const airhandlersSubcategories = [
  {
      name: "Residential Air Handlers",
      slug: "residential-air-handlers"
  },
  {
      name: "Hydronic Air Handlers",
      slug: "hydronic-air-handlers"
  },
  {
      name: "Residential Evaporator Coils",
      slug: "residential-evaporator-coils"
  },
  {
      name: "High Velocity Systems",
      slug: "high-velocity-systems"
  },
  {
      name: "Air Handler Accessories",
      slug: "air-handler-accessories"
  },
  {
      name: "Hydronic Air Handler Parts",
      slug: "hydronic-air-handler-parts"
  },
  {
      name: "Hydronic Add-On Coils",
      slug: "hydronic-add-on-coils"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Air Handlers Subcategory ID
  const airhandlersCategory = await prisma.category.findUnique({
    where: { slug: "air-handlers" },
  });

  if (airhandlersCategory) {

    await prisma.category.createMany({
      data: airhandlersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: airhandlersCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(airhandlersSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
