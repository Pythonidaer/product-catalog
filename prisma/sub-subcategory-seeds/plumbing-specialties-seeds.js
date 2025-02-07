const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const plumbingspecailtiesSubcategories = [
  {
      name: "Air Gaps",
      slug: "air-gaps"
  },
  {
      name: "Bath Fan & Dryer Venting",
      slug: "bath-fan-and-dryer-venting"
  },
  {
      name: "Caulking, Silicone & Epoxy",
      slug: "caulking"
  },
  {
      name: "Cleanout Plugs",
      slug: "cleanout-plugs"
  },
  // In Fittings
  // {
  //     name: "Dielectric Fittings",
  //     slug: "dielectric-fittings"
  // },
  {
      name: "Floor & Ceiling Plates",
      slug: "universal-floor-and-ceiling-plates"
  },
  {
      name: "Gauges",
      slug: "plumbing-tools"
  },
  {
      name: "Home Automation Products",
      slug: "home-automation-products"
  },
  {
      name: "Roof Flashings",
      slug: "roof-flashings"
  },
  // In specialties
  // {
  //     name: "Stud Guards",
  //     slug: "stud-guards"
  // },
  {
      name: "Sheet Leads & Bends",
      slug: "sheet-lead-and-bends"
  },
  {
      name: "Test Equipment",
      slug: "test-equipment"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Plumbing Specialties Subcategory ID
  const plumbingspecialtiesCategory = await prisma.category.findUnique({
    where: { slug: "plumbing-specialties" },
  });

  if (plumbingspecialtiesCategory) {

    await prisma.category.createMany({
      data: plumbingspecailtiesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: plumbingspecialtiesCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(plumbingspecailtiesSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
