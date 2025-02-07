const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const valvesautomationSubcategories = [
    {
        "name": "Butterfly",
        "slug": "butterfly"
    },
    {
        "name": "Ball",
        "slug": "automated-valves"
    },
    {
        "name": "Solenoid",
        "slug": "solenoid"
    },
    {
        "name": "Actuators & Parts",
        "slug": "actuated-valves-actuators-and-parts"
    }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Valves and Automation Subcategory ID
  const valvesautomationCategory = await prisma.category.findUnique({
    where: { slug: "valves-automation" },
});

  if (valvesautomationCategory) {

    await prisma.category.createMany({
      data: valvesautomationSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: valvesautomationCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(valvesautomationSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
