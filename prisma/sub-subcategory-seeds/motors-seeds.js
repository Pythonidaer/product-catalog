const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const motorsSubcategories = [
  {
      "name": "Blower Motors",
      "slug": "blower-motors"
  },
  {
      "name": "Condenser Fan Motors",
      "slug": "condenser-fan-motors"
  },
  {
      "name": "Inducer Motors",
      "slug": "inducer-motors"
  },
  {
      "name": "Furnace Blower Motors",
      "slug": "furnace-blower-motors"
  },
  {
      "name": "Rescue Motors",
      "slug": "rescue-motors"
  },
  {
      "name": "Motor Mounts & Bases",
      "slug": "motor-mounts-and-bases"
  },
  {
      "name": "Other Motors",
      "slug": "other-motors"
  },
  {
      "name": "Fan Blades & Belts",
      "slug": "fan-blades-and-belts"
  },
  {
      "name": "Bearings & Bushings",
      "slug": "bearings-and-bushings"
  },
  {
      "name": "Pulleys & Sheaves",
      "slug": "pulleys-and-sheaves"
  },
  {
      "name": "Blower Housings & Wheels",
      "slug": "blower-housings-and-wheels"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Motors Subcategory ID
  const motorsCategory = await prisma.category.findUnique({
    where: { slug: "motors" },
  });

  if (motorsCategory) {

    await prisma.category.createMany({
      data: motorsSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: motorsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(motorsSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
