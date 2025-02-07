const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const toolsmaintenanceSubcategories = [
  {
      "name": "Cleaners",
      "slug": "cleaners"
  },
  {
      "name": "HVAC Testing Equipment",
      "slug": "hvac-testing-equipment"
  },
  {
      "name": "HVACR Charging Tools & Accessories",
      "slug": "hvac-r-charging-tools-and-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Tools Maintenance Subcategory ID
  const toolsmaintenanceCategory = await prisma.category.findUnique({
    where: { slug: "tools-maintenance" },
  });

  if (toolsmaintenanceCategory) {

    await prisma.category.createMany({
      data: toolsmaintenanceSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: toolsmaintenanceCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(toolsmaintenanceSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
