const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Heating Category ID
  const heatingCategory = await prisma.category.findUnique({
    where: { slug: "main-heating" },
  });

  if (heatingCategory) {
    const heatingSubcategories = [
      {
        name: "Boilers",
        slug: "boilers",
      },
      {
        name: "Indirect Water Heaters",
        slug: "indirect-water-heaters",
      },
      {
        name: "Circulators",
        slug: "circulators",
      },
      {
        name: "Boiler Boards",
        slug: "boiler-boards",
      },
      {
        name: "Air Elimination",
        slug: "air-elimination",
      },
      {
        name: "Oil Heating Specialties",
        slug: "oil-heating-specialties",
      },
    //   {
    //     name: "Expansion Tanks",
    //     slug: "expansion-tanks",
    //   },
      {
        name: "Oil Tanks",
        slug: "oil-tanks",
      },
      {
        name: "Hydronic Zone Valves",
        slug: "hydronic-zone-valves",
      },
      {
        name: "Baseboard",
        slug: "baseboard",
      },
      {
        name: "OEM Boiler Parts",
        slug: "oem-boiler-parts",
      },
      {
        name: "Flow Controls",
        slug: "flow-controls",
      },
      {
        name: "Hydraulic Separation",
        slug: "hydraulic-separation",
      },
      {
        name: "Gas Valves & Accessories",
        slug: "gas-valves-accessories",
      },
      {
        name: "Hydronic Relief & Pressure Valves",
        slug: "hydronic-relief-and-pressure-valves",
      },
      {
        name: "Unit Heaters",
        slug: "unit-heaters",
      },
      {
        name: "Kickspace Heaters",
        slug: "kickspace-heaters",
      },
      {
        name: "Space Heaters",
        slug: "space-heaters",
      },
      {
        name: "Condensate Neutralizers",
        slug: "condensate-neutralizers",
      },
      {
        name: "Hydronic Panel Radiator & Accessories",
        slug: "hydronic-panel-radiator",
      },
      {
        name: "Radiant Pex Heating",
        slug: "radiant-pex-heating",
      },
      {
        name: "Radiator Valves & Tools",
        slug: "radiator-valves-tools",
      },
      {
        name: "Buffer Tanks",
        slug: "buffer-tanks",
      },
      {
        name: "Boiler Chemicals",
        slug: "boiler-chemicals",
      },
      {
        name: "Water Quality",
        slug: "water-quality",
      },
      {
        name: "Electric Heating",
        slug: "electric-heating",
      },
    ];

    // await prisma.category.deleteMany({
    //     where: { parentId: 2 }, 
    //   });

    await prisma.category.createMany({
      data: heatingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: heatingCategory.id,
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
