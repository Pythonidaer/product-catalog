const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const controlsSubcategories = [
  {
      "name": "Building Automation & Commercial HVAC Controls",
      "slug": "building-automation-and-commercial-hvac-controls"
  },
  {
      "name": "Capacitors",
      "slug": "capacitors"
  },
  {
      "name": "Contactors",
      "slug": "contactors"
  },
  {
      "name": "Fan & Limit Controls",
      "slug": "fan-and-limit-controls"
  },
  {
      "name": "Freeze Thermostats",
      "slug": "freeze-thermostats"
  },
  {
      "name": "Other HVACR & Heating Controls",
      "slug": "other-hvacr-and-heating-controls"
  },
  {
      "name": "Pneumatic Control Valves",
      "slug": "pneumatic-control-valves"
  },
  {
      "name": "Pneumatic Controls",
      "slug": "pneumatic-controls"
  },
  {
      "name": "Switches & Relays",
      "slug": "switches-and-relays"
  },
  {
      "name": "Temperature Controllers & Sensors",
      "slug": "temperature-controllers-and-sensors"
  },
  {
      "name": "Thermostats",
      "slug": "thermostats"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Controls Subcategory ID
  const controlsCategory = await prisma.category.findUnique({
    where: { slug: "controls" },
  });

  if (controlsCategory) {

    await prisma.category.createMany({
      data: controlsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: controlsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(controlsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
