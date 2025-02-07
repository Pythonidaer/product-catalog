const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Dispenser Soap Subcategory ID
  const dispenserssoapCategory = await prisma.category.findUnique({
    where: { slug: "dispensers-soap" },
  });

  if (dispenserssoapCategory) {
    const dispenserssoapSubcategories = [
      {
          name: "Hot & Drinking Water",
          slug: "hot-and-drinking-water-dispensers"
      },
      {
          name: "Commercial Bathroom Soap & Lotion Dispensers",
          slug: "commercial-bathroom-soap-and-lotion-dispensers"
      },
      {
          name: "Residential Bathroom Soap & Lotion Dispensers",
          slug: "bathroom-soap-and-lotion-dispensers"
      }
  ];

    await prisma.category.createMany({
      data: dispenserssoapSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: dispenserssoapCategory.id,
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
