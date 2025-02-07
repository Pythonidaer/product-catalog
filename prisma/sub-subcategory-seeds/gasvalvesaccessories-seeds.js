const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const gasvalvesaccessoriesSubcategories = [
  {
      name: "Gas Burners",
      slug: "gas-burners"
  },
  {
      name: "Gas Controls",
      slug: "gas-controls"
  },
  {
      name: "Gas Ignitors",
      slug: "gas-ignitors"
  },
  {
      name: "Gas Pilots",
      slug: "gas-pilots"
  },
  {
      name: "Pilot Tubing",
      slug: "pilot-tubing"
  },
  // Valves Category for both
  // {
  //     name: "Gas Ball Valves - Brass",
  //     slug: "gas-ball-valves---brass"
  // },
  // {
  //     name: "Gas Meter Valves",
  //     slug: "gas-meter-valves"
  // }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Gas Valves Accessories Subcategory ID
  const gasvalvesaccessoriesCategory = await prisma.category.findUnique({
    where: { slug: "gas-valves-accessories" },
  });

  if (gasvalvesaccessoriesCategory) {

    await prisma.category.createMany({
      data: gasvalvesaccessoriesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: gasvalvesaccessoriesCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(gasvalvesaccessoriesSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
