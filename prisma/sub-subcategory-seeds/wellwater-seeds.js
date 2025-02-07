const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const wellwaterSubcategories = [
    {
        "name": "Centrifugal Pumps",
        "slug": "centrifugal-pumps"
    },
    {
        "name": "Dosing Pumps",
        "slug": "dosing-pumps"
    },
    // Pumps Plumbing Subcat for all
    // {
    //     "name": "Grinder Pumps",
    //     "slug": "grinder-pumps"
    // },
    {
        "name": "Jet Pumps",
        "slug": "jet-pumps"
    },
    {
        "name": "Other Pump & Motor Parts",
        "slug": "other-pump-and-motor-parts"
    },
    // {
    //     "name": "Other Pumps",
    //     "slug": "other-pumps"
    // },
    {
        "name": "Peristaltic Pumps",
        "slug": "peristaltic-pumps"
    },
    // {
    //     "name": "Sewage & Effluent Pumps",
    //     "slug": "sewage-and-effluent-pumps"
    // },
    {
        "name": "Submersible Well Pumps",
        "slug": "submersible-well-pumps"
    },
    // {
    //     "name": "Sump Pumps",
    //     "slug": "sump-pumps"
    // },
    {
        "name": "Well/Water Transfer Pumps",
        "slug": "well-water-transfer-pumps"
    }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Well and Water Subcategory ID
  const wellwaterCategory = await prisma.category.findUnique({
    where: { slug: "water-systems-pumps" },
  });

  if (wellwaterCategory) {

    await prisma.category.createMany({
      data: wellwaterSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: wellwaterCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(wellwaterSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
