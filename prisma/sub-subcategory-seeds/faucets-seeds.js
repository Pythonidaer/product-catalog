const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Faucets Category ID
  const faucetsCategory = await prisma.category.findUnique({
    where: { slug: "faucets" },
  });

  if (faucetsCategory) {
    const faucetsSubcategories = [
        {
            name: "Bar & Prep",
            slug: "bar-and-prep-faucets"
        },
        {
            name: "Lavatory",
            slug: "bathroom-faucets"
        },
        {
            name: "Commercial",
            slug: "commercial-faucets"
        },
        {
            name: "Foodservice",
            slug: "foodservice-faucets"
        },
        {
            name: "Hands Free",
            slug: "hands-free-faucets"
        },
        {
            name: "Kitchen",
            slug: "kitchen-faucets"
        },
        {
            name: "Laundry, Utility & Service",
            slug: "laundry-utility-and-service-faucets"
        },
        {
            name: "Tub & Shower",
            slug: "tub-shower-faucets"
        }
    ];

    await prisma.category.createMany({
      data: faucetsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: faucetsCategory.id,
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
