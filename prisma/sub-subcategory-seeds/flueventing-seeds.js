const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const flueventingSubcategories = [
  {
      "name": "All-Fuel Venting",
      "slug": "all-fuel-venting"
  },
  {
      "name": "B-Vent Gas Vent Pipe & Fittings",
      "slug": "b-vent-gas-vent-pipe-and-fittings"
  },
  {
      "name": "Metal Venting",
      "slug": "metal-venting"
  },
  {
      "name": "Durablack Venting Systems",
      "slug": "durablack-venting-systems"
  },
  {
      "name": "Stove Pipe & Fittings",
      "slug": "stove-pipe-and-fittings"
  },
  // Same slug as Z-Flex Venting
  // {
  //     "name": "Z-Flex Chimney Liners & Venting",
  //     "slug": "z-flex-venting"
  // },
  {
      "name": "Termination Kits",
      "slug": "termination-kits"
  },
  {
      "name": "Polypropylene Venting Systems",
      "slug": "polypropylene-venting-systems"
  },
  {
      "name": "Direct Vent Pro Venting Systems",
      "slug": "direct-vent-pro-venting-systems"
  },
  {
      "name": "Field Controls Venting Solutions",
      "slug": "field-controls-venting-solutions"
  },
  {
      "name": "Duraflex Venting",
      "slug": "duraflex-venting"
  },
  {
      "name": "Z-Flex Venting",
      "slug": "z-flex-venting"
  },
  {
      "name": "Z-Flex Chimney Liners",
      "slug": "z-flex-chimney-liners"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Flue Venting Subcategory ID
  const flueventingCategory = await prisma.category.findUnique({
    where: { slug: "flue-venting" },
  });

  if (flueventingCategory) {

    await prisma.category.createMany({
      data: flueventingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: flueventingCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(flueventingSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
