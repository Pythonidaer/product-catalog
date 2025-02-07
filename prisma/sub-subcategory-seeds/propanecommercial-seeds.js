const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const propanecommercialSubcategories = [
  // Valves cat
  // {
  //     "name": "Relief Valves",
  //     "slug": "relief-valves"
  // },
  {
      "name": "Pumps",
      "slug": "pumps"
  },
  // Refrigeration Subcat
  // {
  //     "name": "Compressors",
  //     "slug": "compressors"
  // },
  {
      "name": "Pump & Compressor Parts",
      "slug": "gas-pump-parts"
  },
  {
      "name": "Vaporizers",
      "slug": "vaporizers"
  },
  {
      "name": "Nozzles & Evacuation Adapters",
      "slug": "nozzles-and-evacuation-adapters"
  },
  {
      "name": "Internal Valves",
      "slug": "internal-valves"
  },
  {
      "name": "Cylinder Tank Valves",
      "slug": "cylinder-tank-valves"
  },
  {
      "name": "Dispensing Station Equipment",
      "slug": "dispensing-station-equipment"
  },
  {
      "name": "LP Hoses",
      "slug": "lp-hoses"
  },
  {
      "name": "Strainers/Gas Filters",
      "slug": "strainers-gas-filters"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Commercial Propane Subcategory ID
  const propanecommercialCategory = await prisma.category.findUnique({
    where: { slug: "propane-commercial" },
});

  if (propanecommercialCategory) {

    await prisma.category.createMany({
      data: propanecommercialSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: propanecommercialCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(propanecommercialSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
