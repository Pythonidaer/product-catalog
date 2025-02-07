const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const ductingSubcategories = [
  {
      "name": "Air Diffusers, Grilles & Registers",
      "slug": "air-diffusers-grilles-and-registers"
  },
  {
      "name": "Metal Ductwork",
      "slug": "metal-ductwork"
  },
  {
      "name": "Flexible Venting & Ductwork",
      "slug": "flexible-venting-and-ductwork"
  },
  // Insullation Products Subcat
  // {
  //     "name": "Vent & Duct Insulation",
  //     "slug": "vent-and-duct-insulation"
  // },
  {
      "name": "Other Venting & Ductwork Products",
      "slug": "other-venting-and-ductwork-products"
  },
  {
      "name": "Mastic, Tapes, Sealants",
      "slug": "mastic-tapes-and-sealants"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Ducting Subcategory ID
  const ductingCategory = await prisma.category.findUnique({
    where: { slug: "ducting" },
  });

  if (ductingCategory) {

    await prisma.category.createMany({
      data: ductingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: ductingCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(ductingSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
