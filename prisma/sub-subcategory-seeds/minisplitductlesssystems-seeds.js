const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const minisplitductlesssystemSubcategories = [
  {
      "name": "Standard Systems",
      "slug": "standard-systems"
  },
  {
      "name": "Enhanced Capacity Systems",
      "slug": "enhanced-capacity-systems"
  },
  {
      "name": "Residential Indoor Units",
      "slug": "residential-indoor-units"
  },
  {
      "name": "Multi-Zone Units",
      "slug": "multi-zone-units"
  },
  {
      "name": "Mini-Split Accessories",
      "slug": "mini-split-accessories"
  },
  {
      "name": "Mini-Split Parts",
      "slug": "mini-split-parts"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Mini-Split Ductless Systems Subcategory ID
  const minisplitduxtlesssystemCategory = await prisma.category.findUnique({
    where: { slug: "mini-split-ductless-system" },
  });

  if (minisplitduxtlesssystemCategory) {

    await prisma.category.createMany({
      data: minisplitductlesssystemSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: minisplitduxtlesssystemCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(minisplitductlesssystemSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
