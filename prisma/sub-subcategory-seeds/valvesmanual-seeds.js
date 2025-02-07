const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const valvesmanualSubcategories = [
  {
      "name": "Gate Valves",
      "slug": "industrial-gate-valves"
  },
  // Valves Category for each
  // {
  //     "name": "Needle Valves",
  //     "slug": "needle-valves"
  // },
  // {
  //     "name": "Globe Valves",
  //     "slug": "industrial-globe-valves"
  // },
  {
      "name": "Butterfly Valves",
      "slug": "resilient-seated-butterfly-valves"
  },
  {
      "name": "Check Valves",
      "slug": "industrial-check-valves"
  },
  {
      "name": "Ball Valves",
      "slug": "industrial-ball-valves"
  },
  {
      "name": "Pressure Relief Valves",
      "slug": "industrial-pressure-relief-valves"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Manual valves Subcategory ID
  const valvesmanualCategory = await prisma.category.findUnique({
    where: { slug: "valves-manual" },
});

  if (valvesmanualCategory) {

    await prisma.category.createMany({
      data: valvesmanualSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: valvesmanualCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(valvesmanualSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
