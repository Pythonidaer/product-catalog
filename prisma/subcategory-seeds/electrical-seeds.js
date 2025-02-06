const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Electrical Supplies Category ID
  const electricalCategory = await prisma.category.findUnique({
    where: { slug: "main-electrical" },
  });

  if (electricalCategory) {
    const electricalSubcategories = [
      {
          name: "Circuit Breakers",
          slug: "circuit-breakers"
      },
      {
          name: "Construction Products",
          slug: "construction-products"
      },
      {
          name: "Disconnects",
          slug: "disconnects"
      },
      {
          name: "Electrical Hardware",
          slug: "electrical-hardware"
      },
      {
          name: "Electrical Misc Supplies",
          slug: "electrical-misc-supplies"
      },
      {
          name: "Fuses & Fuse Blocks",
          slug: "fuses-and-fuse-blocks"
      },
      {
          name: "Generator Parts & Supplies",
          slug: "generator-parts-and-supplies"
      },
      {
          name: "Portable Generator Accessories",
          slug: "portable-generator-accessories"
      },
      {
          name: "Portable Generators",
          slug: "portable-generators"
      },
      {
          name: "Standby Generators",
          slug: "standby-generators"
      },
      {
          name: "Transfer Switches",
          slug: "transfer-switches"
      },
      {
          name: "Standby Generator Accessories",
          slug: "standby-generators-accessories"
      },
      {
          name: "Heating Cable",
          slug: "heating-cable"
      },
      {
          name: "Light Bulbs",
          slug: "light-bulbs"
      },
      {
          name: "Transformer Accessories",
          slug: "transformer-accessories"
      },
      {
          name: "Transformers",
          slug: "transformers"
      },
      {
          name: "Whips",
          slug: "whips"
      },
      {
          name: "Wire, Cable & Conduit",
          slug: "wire-cable-and-conduit"
      }
  ];

    await prisma.category.createMany({
      data: electricalSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: electricalCategory.id,
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
