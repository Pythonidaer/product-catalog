const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Faucets Category ID
  const plumbingrepairpartsCategory = await prisma.category.findUnique({
    where: { slug: "plumbing-repair-parts" },
  });

  if (plumbingrepairpartsCategory) {
    const plumbingrepairpartsSubcategories = [
      {
          name: "Eye Wash",
          slug: "eye-wash-repair-parts"
      },
      {
          name: "Faucet",
          slug: "faucet-repair-parts"
      },
      {
          name: "Garbage Disposal",
          slug: "garbage-disposal-parts"
      },
      {
          name: "Plumbing Valve",
          slug: "valve-repair-parts"
      },
      {
          name: "Sink, Drain & Tub",
          slug: "sink-drain-and-tub-repair-parts"
      },
      {
          name: "Toilet & Urinal",
          slug: "toilet-urinal-parts"
      },
      {
          name: "Water Coolers & Fountain",
          slug: "water-coolers-and-fountain-repair-parts"
      },
      {
          name: "Water Heater",
          slug: "water-heater-repair-parts"
      }
  ];

    await prisma.category.createMany({
      data: plumbingrepairpartsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: plumbingrepairpartsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
