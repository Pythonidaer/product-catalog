const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const acheatpumpSubcategories = [
  {
      name: "Air Conditioning",
      slug: "air-conditioning"
  },
  {
      name: "Air Source Heat Pumps",
      slug: "air-source-heat-pumps"
  },
  {
      name: "Heat Pumps High Efficiency Inverter Driven",
      slug: "heat-pumps-high-efficiency-inverter-driven"
  },
  {
      name: "Portable & Room Air Conditioners",
      slug: "portable-and-room-air-conditioners"
  },
  {
      name: "A/C & Heat Pump Accessories",
      slug: "a-c-and-heat-pump-accessories"
  },
  {
      name: "A/C & Heat Pump Parts",
      slug: "a-c-and-heat-pump-parts"
  },
  {
      name: "Condenser Pads",
      slug: "condenser-pads"
  },
  {
      name: "Snow Stands & Wall Bracket",
      slug: "snow-stands-and-wall-bracket"
  },
  {
      name: "Condensate Pumps",
      slug: "condensate-pumps"
  },
  {
      name: "Replacement Parts",
      slug: "replacement-parts"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get AC Heat Pump Subcategory ID
  const acheatpumpCategory = await prisma.category.findUnique({
    where: { slug: "ac-heat-pump" },
});

  if (acheatpumpCategory) {

    await prisma.category.createMany({
      data: acheatpumpSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: acheatpumpCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(acheatpumpSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
