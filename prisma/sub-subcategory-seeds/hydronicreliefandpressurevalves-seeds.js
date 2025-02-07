const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const hydronicSubcategories = [
  {
      name: "Safety Relief Valves",
      slug: "safety-relief-valves"
  },
  {
      name: "Hydronic Pressure Regulators",
      slug: "hydronic-pressure-regulators"
  },
  {
      name: "Pressure Reducing Valves & Automation",
      slug: "pressure-reducing-valves-and-automation"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Hydronic Relief and Pressure Valves Subcategory ID
  const hydronicCategory = await prisma.category.findUnique({
    where: { slug: "hydronic-relief-and-pressure-valves" },
  });

  if (hydronicCategory) {

    await prisma.category.createMany({
      data: hydronicSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: hydronicCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(hydronicSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
