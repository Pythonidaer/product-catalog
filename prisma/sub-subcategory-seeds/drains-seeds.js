const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Drains Subcategory ID
  const drainsCategory = await prisma.category.findUnique({
    where: { slug: "drains" },
  });

  if (drainsCategory) {
    const drainsSubcategories = [
      {
          name: "Kitchen Sink Drains",
          slug: "strainers-and-stoppers"
      },
      {
          name: "Tubular Drains",
          slug: "tubular-water-supply-parts"
      },
      {
          name: "Tub & Shower Drains",
          slug: "bathtub-and-shower-drains"
      },
      {
          name: "Floor Cleanouts",
          slug: "floor-cleanouts"
      },
      {
          name: "Sink Carriers",
          slug: "sink-carriers"
      },
      {
          name: "Floor Sinks",
          slug: "floor-sinks"
      },
      {
          name: "Toilet Carriers",
          slug: "toilet-carriers"
      },
      {
          name: "Floor & Roof Drainage",
          slug: "floor-and-roof-drainage"
      },
      {
          name: "Urinal Carriers",
          slug: "urinal-carriers"
      },
      {
          name: "Lavatory Sink Drains",
          slug: "bathroom-sink-drains"
      }
  ];

    await prisma.category.createMany({
      data: drainsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: drainsCategory.id,
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
