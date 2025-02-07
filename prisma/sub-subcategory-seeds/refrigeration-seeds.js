const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const refrigerationSubcategories = [
  {
      "name": "Compressors",
      "slug": "compressors"
  },
  {
      "name": "Condensing Units",
      "slug": "condensing-units"
  },
  {
      "name": "Evaporators",
      "slug": "evaporators"
  },
  {
      "name": "Ice Machines",
      "slug": "ice-machines"
  },
  {
      "name": "Ice Machine Parts",
      "slug": "ice-machine-parts"
  },
  {
      "name": "Ice Machine Cleaners",
      "slug": "ice-machine-cleaners"
  },
  {
      "name": "Line Sets & Coverings",
      "slug": "line-sets-and-coverings"
  },
  {
      "name": "Compressor Parts",
      "slug": "compressor-parts"
  },
  {
      "name": "Refrigeration Valves & Driers",
      "slug": "refrigeration-valves-and-driers"
  },
  {
      "name": "Refrigeration Tubing & Insulation",
      "slug": "refrigeration-tubing-and-insulation"
  },
  {
      "name": "Refrigerant Recovery",
      "slug": "refrigerant-recovery"
  },
  {
      "name": "Refrigerant",
      "slug": "refrigerant"
  },
  {
      "name": "Refrigerant Condensate Treatment",
      "slug": "refrigerant-condensate-treatment"
  },
  {
      "name": "Refrigeration Press Fittings",
      "slug": "refrigeration-press-fittings"
  },
  {
      "name": "Refrigerant Acid Neutralization",
      "slug": "refrigerant-acid-neutralization"
  },
  {
      "name": "Refrigerant Flush Kits",
      "slug": "refrigerant-flush-kits"
  },
  {
      "name": "Other Refrigeration Products",
      "slug": "other-refrigeration-products"
  },
  {
      "name": "Refrigeration Ball Valves",
      "slug": "refrigeration-ball-valves"
  },
  {
      "name": "Defrost Controls & Time Clocks",
      "slug": "defrost-controls-and-time-clocks"
  },
  {
      "name": "Refrigeration Regulating Valves",
      "slug": "refrigeration-regulating-valves"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Refrigeration Subcategory ID
  const refrigerationCategory = await prisma.category.findUnique({
    where: { slug: "refrigeration" },
  });

  if (refrigerationCategory) {

    await prisma.category.createMany({
      data: refrigerationSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: refrigerationCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(refrigerationSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
