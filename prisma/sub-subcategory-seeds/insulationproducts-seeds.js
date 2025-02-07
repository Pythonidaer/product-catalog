const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const insulationproductsSubcategories = [
  {
      "name": "Fiberglass Pipe Insulation",
      "slug": "pipe-insulation"
  },
  {
      "name": "Zeston Fittings",
      "slug": "insulation-fittings"
  },
  {
      "name": "Duct Insulation",
      "slug": "vent-and-duct-insulation"
  },
  // In Hangers category
  // {
  //     "name": "Supplies",
  //     "slug": "insulation-shields"
  // }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Insulation Products Subcategory ID
  const insulationproductCategory = await prisma.category.findUnique({
    where: { slug: "insulation-products" },
  });

  if (insulationproductCategory) {

    await prisma.category.createMany({
      data: insulationproductsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: insulationproductCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(insulationproductsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
