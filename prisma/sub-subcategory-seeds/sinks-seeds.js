const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Sinks Subcategory ID
  const sinksCategory = await prisma.category.findUnique({
    where: { slug: "sinks" },
  });

  if (sinksCategory) {
    const sinksSubcategories = [
      {
          "name": "Bar & Prep",
          "slug": "bar-and-prep-sinks"
      },
      {
          "name": "Foodservice",
          "slug": "foodservice-sinks"
      },
      {
          "name": "Kitchen",
          "slug": "kitchen-sinks"
      },
      {
          "name": "Laundry, Utility & Service",
          "slug": "laundry-utility-service"
      },
      {
          "name": "Lavatory",
          "slug": "lavatory-sinks"
      },
      {
          "name": "Vanity",
          "slug": "vanity-sinks-fixtures"
      }
  ];

    await prisma.category.createMany({
      data: sinksSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: sinksCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
