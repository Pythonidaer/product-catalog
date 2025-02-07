const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const commercialproductSubcategories = [
  {
      name: "Commercial Rooftop Systems & Components",
      slug: "commercial-rooftop-systems-and-components"
  },
  {
      name: "Commercial Split Systems & Components",
      slug: "commercial-split-systems-and-components"
  },
  {
      name: "VRF Air Conditioning Systems",
      slug: "vrf-air-conditioning-systems"
  },
  {
      name: "VRF Air Conditioning Accessories",
      slug: "vrf-air-conditioning-accessories"
  },
  {
      name: "Water Source Heat Pumps",
      slug: "water-source-heat-pumps"
  },
  {
      name: "Chillers & Unit Coolers",
      slug: "chillers-and-unit-coolers"
  },
  {
      name: "Self-Contained Packaged Units",
      slug: "self-contained-packaged-units"
  },
  {
      name: "Chiller & Unit Cooler Parts",
      slug: "chiller-and-unit-cooler-parts"
  },
  {
      name: "Commercial Portable A/C",
      slug: "commercial-portable-a-c"
  },
  {
      name: "Small Package Units",
      slug: "residential-small-package-units"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Commercial Products Subcategory ID
  const commercialproductCategory = await prisma.category.findUnique({
    where: { slug: "commercial-products" },
  });

  if (commercialproductCategory) {

    await prisma.category.createMany({
      data: commercialproductSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: commercialproductCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(commercialproductSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
