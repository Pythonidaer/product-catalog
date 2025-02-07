const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const plumbingaccessoriesSubcategories =     [
  // Tub Showers Subcate
  // {
  //     name: "Bathroom",
  //     slug: "bathroom-accessories"
  // },
  // Plumbing Cat and Garbage Disposals Subcat (commented out in latter)
  // {
  //     name: "Garbage Disposal",
  //     slug: "garbage-disposals"
  // },
  {
      name: "Kitchen",
      slug: "kitchen-accessories"
  },
  // Toilets and related Subcat
  // {
  //     name: "Toilet",
  //     slug: "toilet-accessories"
  // },
  // Tub Showers Subcate
  // {
  //     name: "Tub & Shower",
  //     slug: "tub-shower-accessories"
  // },
  // Water HEater Subcat
  // {
  //     name: "Water Heater",
  //     slug: "water-heater-accessories"
  // }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Plumbing Accessories Subcategory ID
  const plumbingaccessoriesCategory = await prisma.category.findUnique({
    where: { slug: "plumbing-accessories" },
  });

  if (plumbingaccessoriesCategory) {

    await prisma.category.createMany({
      data: plumbingaccessoriesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: plumbingaccessoriesCategory.id,
      })),
    });
  }
  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(plumbingaccessoriesSubcategories)
    console.error("Duplicates identified on failure: ", duplicates)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
