const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const waterqualitySubcategories = [
  {
      name: "Demineralizers",
      slug: "demineralizers"
  },
  {
      name: "Flush Carts",
      slug: "flush-carts"
  },
  {
      name: "Deionizer Carts & Accessories",
      slug: "deionizer-carts-and-accessories"
  },
  {
      name: "System Feeders",
      slug: "system-feeders"
  },
  {
      name: "Water Quality Accessories",
      slug: "water-quality-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Water Quality Subcategory ID
  const waterqualityCategory = await prisma.category.findUnique({
    where: { slug: "water-quality" },
  });

  if (waterqualityCategory) {

    await prisma.category.createMany({
      data: waterqualitySubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: waterqualityCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(waterqualitySubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
