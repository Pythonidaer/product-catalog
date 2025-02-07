const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Tub Shower Subcategory ID
  const tubshowerCategories = await prisma.category.findUnique({
    where: { slug: "tub-shower" },
  });

  if (tubshowerCategories) {
    const tubshowerCategories = [
      {
          name: "Alcove Tubs",
          slug: "alcove-tubs"
      },
      {
          name: "Bathtub & Shower Combo Units",
          slug: "bathtub-and-shower-combo-units"
      },
      {
          name: "Shower Bases",
          slug: "shower-bases"
      },
      {
          name: "Bathtub & Shower Wall Kits",
          slug: "bathtub-and-shower-wall-kits"
      },
      {
          name: "Drop In & Undermount Tubs",
          slug: "drop-in-and-undermount-tubs"
      },
      {
          name: "Freestanding Tubs",
          slug: "freestanding-tubs"
      },
      {
          name: "Whirlpool, Air & Therapy Tubs",
          slug: "whirlpool-air-and-therapy-tubs"
      },
      {
          name: "Walk In Tubs",
          slug: "walk-in-tubs"
      },
      {
          name: "Tub & Shower Valves",
          slug: "tub-shower-faucets "
      },
      {
          name: "Bathroom Accessories",
          slug: "bathroom-accessories"
      },
      {
          name: "Tub & Shower Accessories",
          slug: "tub-shower-accessories"
      }
  ];

    await prisma.category.createMany({
      data: tubshowerCategories.map((subcategory) => ({
        ...subcategory,
        parentId: tubshowerCategories.id,
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
