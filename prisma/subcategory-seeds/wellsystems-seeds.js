const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Wellness Systems Category ID
  const wellsystemsCategory = await prisma.category.findUnique({
    where: { slug: "well-systems" },
  });

  if (wellsystemsCategory) {
    const wellsystemsSubcategories = [
      {
          name: "Drives",
          slug: "drives"
      },
      {
          name: "Geothermal Products",
          slug: "geothermal-products"
      },
      // Added in Plumbing
      // {
      //     name: "Water Filtration",
      //     slug: "water-filtration"
      // },
      {
          name: "Water Systems Fittings",
          slug: "water-systems-fittings"
      },
      {
          name: "Water Systems Pipe / Tubing",
          slug: "water-systems-pipe---tubing"
      },
      {
          name: "Water Systems Pumps",
          slug: "water-systems-pumps"
      },
      {
          name: "Water Systems Specialties",
          slug: "water-systems-specialties"
      },
      {
          name: "Water Systems Valves",
          slug: "water-systems-valves"
      }
  ];
  

    await prisma.category.createMany({
      data: wellsystemsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: wellsystemsCategory.id,
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
