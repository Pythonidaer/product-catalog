const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const plumbingvalvesSubcategories = [
  {
      name: "Air Admittance Valves",
      slug: "air-admittance-valves"
  },
  // All in Valves
  // {
  //     name: "Backflow Prevention Valves",
  //     slug: "backflow-prevention-valves"
  // },
  // {
  //     name: "Backwater Valves",
  //     slug: "backwater-valves"
  // },
  {
      name: "Balancing & Circuit Setter",
      slug: "balancing-and-circuit-setter"
  },
  // All in Valves
  // {
  //     name: "Ball Valves",
  //     slug: "ball-valves"
  // },
  // {
  //     name: "Check Valves",
  //     slug: "check-valves"
  // },
  // {
  //     name: "Mixing Valves",
  //     slug: "mixing-valves"
  // },
  {
      name: "Plumbing Relief Valves",
      slug: "plumbing-relief-valves"
  },
  {
      name: "Pressure Regulator Valves",
      slug: "pressure-regulators"
  },
  {
      name: "Sump Pump Check Valves",
      slug: "sump-pump-check-valves"
  },
  // Valves
  // {
  //     name: "Laboratory Valves",
  //     slug: "laboratory-valves"
  // },
  // Valves
  // {
  //     name: "Tankless Water Heater Valves",
  //     slug: "tankless-water-heater-isolation-valves"
  // },
  {
      name: "Trap Primers",
      slug: "trap-primers"
  },
  // Industrial Cat
  // {
  //     name: "Y-Strainers",
  //     slug: "pipe-line-strainers"
  // },
  // Valves Cat
  // {
  //     name: "Washing Machine Valves",
  //     slug: "washing-machine-valves"
  // },
  {
      name: "Water Stops",
      slug: "water-stops"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Plumbing Valves Subcategory ID
  const plumbingvalvesCategory = await prisma.category.findUnique({
    where: { slug: "plumbing-valves" },
  });

  if (plumbingvalvesCategory) {

    await prisma.category.createMany({
      data: plumbingvalvesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: plumbingvalvesCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(plumbingvalvesSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
