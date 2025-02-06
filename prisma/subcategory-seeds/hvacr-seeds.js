const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get HVAC/R Category ID
  const hvacrCategory = await prisma.category.findUnique({
    where: { slug: "main-hvacr" },
  });

  if (hvacrCategory) {
    const hvacrSubcategories = [
      {
          name: "A/C & Heat Pump Accessories",
          slug: "ac-heat-pump"
      },
      {
          name: "Air Handlers/Coils",
          slug: "air-handlers"
      },
      {
          name: "Commercial Products",
          slug: "commercial-products"
      },
      {
          name: "Controls",
          slug: "controls"
      },
      {
          name: "Ducting and RGD's",
          slug: "ducting"
      },
      {
          name: "Flue Venting",
          slug: "flue-venting"
      },
      {
          name: "Furnaces",
          slug: "furnaces"
      },
      {
          name: "Tools, Maintenance & Repair Supplies",
          slug: "tools-maintenance"
      },
      {
          name: "Indoor Air Quality",
          slug: "indoor-air-quality"
      },
      {
          name: "Insulation Products",
          slug: "insulation-products"
      },
      {
          name: "Mini-Split Ductless Systems",
          slug: "mini-split-ductless-systems"
      },
      {
          name: "Motors",
          slug: "motors"
      },
      {
          name: "Refrigeration",
          slug: "refrigeration"
      },
      {
          name: "Zoning",
          slug: "zoning"
      }
  ];

    await prisma.category.createMany({
      data: hvacrSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: hvacrCategory.id,
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
