const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const radiatorvalvestoolsSubcategories = [
  // Valves Cat
  // {
  //     name: "Brass Radiator Valves",
  //     slug: "brass-radiator-valves"
  // },
  {
      name: "Thermostatic Radiator Valves",
      slug: "thermostatic-radiator-valves"
  },
  {
      name: "Radiator Installation Tools",
      slug: "radiator-installation-tools"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Radiator Valves Tools Subcategory ID
  const radiatorvalvestoolsCategory = await prisma.category.findUnique({
    where: { slug: "radiator-valves-tools" },
  });

  if (radiatorvalvestoolsCategory) {

    await prisma.category.createMany({
      data: radiatorvalvestoolsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: radiatorvalvestoolsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(radiatorvalvestoolsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
