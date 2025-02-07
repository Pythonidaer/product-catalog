const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const baseboardSubcategories = [
  {
      name: "High Temperature Baseboard",
      slug: "high-temperature-baseboard"
  },
  {
      name: "Low Temperature Baseboard",
      slug: "low-temperature-baseboard"
  },
  {
      name: "Baseboard Enclosure",
      slug: "baseboard-enclosure"
  },
  {
      name: "Baseboard Accessories",
      slug: "baseboard-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Baseboard Subcategory ID
  const baseboardCategory = await prisma.category.findUnique({
    where: { slug: "baseboard" },
  });

  if (baseboardCategory) {

    await prisma.category.createMany({
      data: baseboardSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: baseboardCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(baseboardSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
