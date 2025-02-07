const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const circulatorsSubcategories = [
  // Pumps Plumbing Subcat
  // {
  //     name: "Circulator Pumps",
  //     slug: "circulator-pumps"
  // },
  {
      name: "ECM Circulators",
      slug: "ecm-circulators"
  },
  {
      name: "Booster Pumps",
      slug: "booster-pumps"
  },
  {
      name: "Bearing Assemblies",
      slug: "bearing-assemblies"
  },
  {
      name: "Circulator Couplings & Impellers",
      slug: "circulator-couplings-and-impellers"
  },
  {
      name: "Circulator Flanges & Gaskets",
      slug: "circulator-flanges-and-gaskets"
  },
  {
      name: "Circulator Motors",
      slug: "circulator-motors"
  },
  {
      name: "Other Circulator Parts",
      slug: "other-circulator-parts"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Water Heaters Subcategory ID
  const circulatorsCategory = await prisma.category.findUnique({
    where: { slug: "circulators" },
  });

  if (circulatorsCategory) {

    await prisma.category.createMany({
      data: circulatorsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: circulatorsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(circulatorsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
