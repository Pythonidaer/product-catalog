const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const flowcontrolsSubcategories = [
  // Valves Category
  // {
  //     name: "Boiler Fill Valves",
  //     slug: "boiler-fill-valves"
  // },
  {
      name: "Low Water Cut-Off",
      slug: "low-water-cut-off"
  },
  {
      name: "Water Feeders",
      slug: "water-feeders"
  },
  // Plumbing Valves Subcat
  // {
  //     name: "Balancing & Circuit Setter",
  //     slug: "balancing-and-circuit-setter"
  // },
  // Valves Category
  // {
  //     name: "Flow Control Valves",
  //     slug: "flow-control-valves"
  // },
  {
      name: "Pump Controller",
      slug: "pump-controller"
  },
  {
      name: "Other Flow Controls",
      slug: "other-flow-controls"
  },
  {
      name: "Flow Switches",
      slug: "flow-switches"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Flow Controls Subcategory ID
  const flowcontrolsCategory = await prisma.category.findUnique({
    where: { slug: "flow-controls" },
  });

  if (flowcontrolsCategory) {

    await prisma.category.createMany({
      data: flowcontrolsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: flowcontrolsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(flowcontrolsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
