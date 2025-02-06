const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Fire Protection Category ID
  const fireprotectionCategory = await prisma.category.findUnique({
    where: { slug: "fire-protection" },
  });

  if (fireprotectionCategory) {
    const fireprotectionSubcategories = [
     // Already added on Hangers page
      // {
      //     name: "Fire Protection Gaskets & Hangers",
      //     slug: "fire-protection-gaskets-and-hangers"
      // },
      {
          name: "Flow, Tamper, Supervisory Switches & Gauges",
          slug: "flow-tamper-supervisory-switches-and-gauges"
      },
      {
          name: "Grooved Valves",
          slug: "grooved-valves"
      },
      {
          name: "Mechanical Tees",
          slug: "mechanical-tees"
      },
      {
          name: "Other Fire Protection Products",
          slug: "other-fire-protection-products"
      },
      // Already added on Hangers page
      // {
      //     name: "Seismic Hangers",
      //     slug: "seismic-hangers"
      // },
      {
          name: "Sprinkler Accessories",
          slug: "sprinkler-accessories"
      },
      {
          name: "Sprinklers",
          slug: "sprinklers"
      },
      {
          name: "Threaded Valves",
          slug: "threaded-valves"
      },
      {
          name: "Weld-O-Lets",
          slug: "forged-steel-fire-fittings"
      }
  ];

    await prisma.category.createMany({
      data: fireprotectionSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: fireprotectionCategory.id,
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
