const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Valves Category ID
  const valvesCategory = await prisma.category.findUnique({
    where: { slug: "main-valves" },
  });

  if (valvesCategory) {
    const valvesSubcategories = [
      {
          name: "Actuated Valves",
          slug: "actuated-valves"
      },
      {
          name: "Backflow Prevention Valves",
          slug: "backflow-prevention-valves"
      },
      {
          name: "Backwater Valves",
          slug: "backwater-valves"
      },
      {
          name: "Boiler Drain Valves",
          slug: "boiler-drain-valves"
      },
      {
          name: "Boiler Fill Valves",
          slug: "boiler-fill-valves"
      },
      {
          name: "Brass Ball Valves",
          slug: "ball-valves"
      },
      {
          name: "Butterfly Valves",
          slug: "butterfly-valves"
      },
      {
          name: "Check Valves",
          slug: "check-valves"
      },
      {
          name: "Control Valves",
          slug: "control-valves"
      },
      {
          name: "CPVC Ball Valves",
          slug: "cpvc-ball-valves"
      },
      {
          name: "Diaphragm Valves",
          slug: "diaphragm-valves"
      },
      {
          name: "Flow Control Valves",
          slug: "flow-control-valves"
      },
      {
          name: "Gas Ball Valves",
          slug: "gas-ball-valves---brass"
      },
      {
          name: "Gas Meter Valves",
          slug: "gas-meter-valves"
      },
      {
          name: "Gas Valves",
          slug: "gas-valves"
      },
      {
          name: "Gate Valves",
          slug: "gate-valves"
      },
      {
          name: "Globe Valves",
          slug: "industrial-globe-valves"
      },
      // Added in Fire Protection Seed
      // {
      //     name: "Grooved Valves",
      //     slug: "grooved-valves"
      // },
      {
          name: "Isolation Valves",
          slug: "tankless-water-heater-isolation-valves"
      },
      {
          name: "Laboratory Valves",
          slug: "laboratory-valves"
      },
      {
          name: "Mixing Valves",
          slug: "mixing-valves"
      },
      {
          name: "Needle Valves",
          slug: "needle-valves"
      },
      {
          name: "Plastic Ball Valves",
          slug: "plastic-ball-valves"
      },
      {
          name: "Plastic Check Valves",
          slug: "industrial-plastic-check-valves"
      },
      {
          name: "Plug Valves",
          slug: "plug-valves"
      },
      {
          name: "Pressure Reducing Valves",
          slug: "pressure-reducing-valves"
      },
      {
          name: "Radiator Valves",
          slug: "brass-radiator-valves"
      },
      {
          name: "Relief Valves",
          slug: "relief-valves"
      },
      // Added in Plumbing
      // {
      //     name: "Sillcocks & Hose Bibbs",
      //     slug: "sillcocks-and-hose-bibbs"
      // },
      {
          name: "Solenoid Valves",
          slug: "solenoid-valves"
      },
      {
          name: "Washing Machine Valves",
          slug: "washing-machine-valves"
      },
      {
          name: "Water Meter Valves",
          slug: "water-meter-valves"
      }
  ];

    await prisma.category.createMany({
      data: valvesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: valvesCategory.id,
      })),
    });
  }

  console.log("✅ Subcategories seeded successfully!");
}

seedSubcategories()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
