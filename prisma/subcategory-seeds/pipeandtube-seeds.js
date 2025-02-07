const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Pipe & Tubing Category ID
  const pipetubingCategory = await prisma.category.findUnique({
    where: { slug: "main-pipe" },
  });

  if (pipetubingCategory) {
    const pipetubingSubcategories = [
      {
          name: "Copper Tubing",
          slug: "copper-tubing"
      },
      {
          name: "Copper Coils",
          slug: "copper-coils"
      },
      {
          name: "Plastic Pipe",
          slug: "plastic-pipe"
      },
      {
          name: "Galvanized Pipe",
          slug: "galvanized-pipe"
      },
      {
          name: "Black Steel Pipe",
          slug: "black-steel-pipe"
      },
      {
          name: "Brass Pipe",
          slug: "brass-pipe"
      },
      {
          name: "Cast Iron Pipe",
          slug: "cast-iron-pipe"
      },
      {
          name: "Stainless Steel Pipe",
          slug: "stainless-steel-pipe"
      },
      // Already added on plumbing page
      // {
      //     name: "Pex Tubing",
      //     slug: "pex-tubing"
      // },
      {
          name: "Polyethylene Pipe",
          slug: "polyethylene-pipe"
      },
      {
          name: "Vinyl Tubing",
          slug: "vinyl-tubing"
      },
      {
          name: "Aluminum Pipe",
          slug: "aluminum-pipe"
      }
  ];

    await prisma.category.createMany({
      data: pipetubingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: pipetubingCategory.id,
      })),
    });
  }

  console.log("✅ Subcategories seeded successfully!");
}

seedSubcategories()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
