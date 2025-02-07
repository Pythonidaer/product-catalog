const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const waterheatersSubcategories = [
  {
      name: "Tankless Water Heaters",
      slug: "tankless-water-heaters"
  },
  {
      name: "Residential Tank Water Heaters",
      slug: "residential-tank-water-heaters"
  },
  // Already in heating subcat seed
  // {
  //     name: "Indirect Water Heaters",
  //     slug: "indirect-water-heaters"
  // },
  {
      name: "Storage Tanks",
      slug: "storage-tanks"
  },
  {
      name: "Oil Fired Water Heaters",
      slug: "oil-fired-water-heaters"
  },
  {
      name: "Mobile Home Water Heaters",
      slug: "mobile-home-water-heaters"
  },
  {
      name: "Commercial Tank Water Heaters",
      slug: "commercial-tank-water-heaters"
  },
  {
      name: "Point Of Use Water Heaters",
      slug: "point-of-use-water-heaters"
  },
  {
      name: "Commercial Point Of Use Water Heaters",
      slug: "commercial-point-of-use-water-heaters"
  },
  {
      name: "Water Heater Accessories",
      slug: "water-heater-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Water Heaters Subcategory ID
  const waterheatersCategory = await prisma.category.findUnique({
    where: { slug: "water-heater-appliances" },
  });

  if (waterheatersCategory) {

    await prisma.category.createMany({
      data: waterheatersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: waterheatersCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(waterheatersSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
