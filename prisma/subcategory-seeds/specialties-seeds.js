const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Specialties Category ID
  const specialtiesCategory = await prisma.category.findUnique({
    where: { slug: "specialties" },
  });

  if (specialtiesCategory) {
    const specialtiesSubcategories = [
      {
          name: "Batteries",
          slug: "batteries"
      },
      {
          name: "Brazing & Solder",
          slug: "brazing-and-solder"
      },
      {
          name: "Building Materials",
          slug: "building-materials"
      },
      {
          name: "Chemicals",
          slug: "chemicals"
      },
      {
          name: "Cleaning Supplies",
          slug: "cleaning-supplies"
      },
      {
          name: "Paint",
          slug: "paint"
      },
      {
          name: "Pipe Markers",
          slug: "pipe-labels"
      },
      {
          name: "Seasonal",
          slug: "seasonal"
      },
      {
          name: "Stud Guards",
          slug: "stud-guards"
      },
      {
          name: "Tapes",
          slug: "tapes"
      }
  ];

    await prisma.category.createMany({
      data: specialtiesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: specialtiesCategory.id,
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
