const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Tools Category ID
  const toolsCategory = await prisma.category.findUnique({
    where: { slug: "main-tools" },
  });

  if (toolsCategory) {
    const toolsSubcategories = [
      {
          name: "Power Tools",
          slug: "power-tools"
      },
      {
          name: "Hand Tools",
          slug: "hand-tools"
      },
      {
          name: "Blades, Bits & Accessories",
          slug: "blades-bits-and-accessories"
      },
      {
          name: "Ladders",
          slug: "ladders"
      },
      {
          name: "Extension Cords & Power Accessories",
          slug: "extension-cords"
      },
      {
          name: "Radios",
          slug: "radios"
      },
      {
          name: "Power Vacuums",
          slug: "power-vacuums"
      },
      {
          name: "Outdoor Equipment",
          slug: "outdoor-equipment"
      },
      {
          name: "Work Lighting",
          slug: "work-lighting"
      },
      {
          name: "Tool Storage",
          slug: "tool-storage"
      }
  ];

    await prisma.category.createMany({
      data: toolsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: toolsCategory.id,
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
