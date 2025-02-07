const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Toilet Fixtures Subcategory ID
  const toiletfixturesCategory = await prisma.category.findUnique({
    where: { slug: "toilet-fixtures" },
  });

  if (toiletfixturesCategory) {
    const toiletfixturesSubcategories = [
      {
          name: "Bidets",
          slug: "bidets"
      },
      {
          name: "Bidet Seats",
          slug: "bidet-seats"
      },
      {
          name: "Commercial Toilets",
          slug: "commercial-toilets"
      },
      {
          name: "Macerating Toilets",
          slug: "macerating-toilets"
      },
      {
          name: "One Piece Toilets",
          slug: "one-piece-toilets"
      },
      {
          name: "Toilet Accessories",
          slug: "toilet-accessories"
      },
      {
          name: "Toilet Seats",
          slug: "toilet-seats"
      },
      {
          name: "Toilet Tank Covers",
          slug: "toilet-tank-covers"
      },
      {
          name: "Two Piece Toilets",
          slug: "two-piece-toilets"
      },
      {
          name: "Wall Mounted Toilets",
          slug: "residential-wall-hung-toilets"
      }
  ];

    await prisma.category.createMany({
      data: toiletfixturesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: toiletfixturesCategory.id,
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
