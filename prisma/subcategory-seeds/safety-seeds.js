const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Safety Equipment Category ID
  const safetyCategory = await prisma.category.findUnique({
    where: { slug: "main-safety" },
  });

  if (safetyCategory) {
    const safetySubcategories = [
      {
          name: "CO2/CO & Smoke Detectors",
          slug: "co2-co-and-smoke-detectors"
      },
      {
          name: "Eye Wash, Accessories & Parts",
          slug: "eye-wash-accessories-and-parts"
      },
      {
          name: "Face Masks",
          slug: "face-masks"
      },
      {
          name: "First Aid",
          slug: "first-aid"
      },
      {
          name: "Glasses",
          slug: "glasses"
      },
      {
          name: "Gloves",
          slug: "gloves"
      },
      {
          name: "Hard Hats & Helmets",
          slug: "hard-hats-and-helmets"
      },
      {
          name: "Hearing Protection",
          slug: "hearing-protection"
      },
      {
          name: "Kneeling Pads",
          slug: "kneeling-pads"
      },
      {
          name: "Other Safety Products",
          slug: "other-safety-products"
      },
      {
          name: "Reflective Vests",
          slug: "reflective-vests"
      },
      {
          name: "Safety Signs",
          slug: "safety-signs"
      },
      {
          name: "Workwear",
          slug: "workwear"
      }
  ];

    await prisma.category.createMany({
      data: safetySubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: safetyCategory.id,
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
