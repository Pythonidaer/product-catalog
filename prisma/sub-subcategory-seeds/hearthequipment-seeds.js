const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const hearthequipmentSubcategories = [
  {
      "name": "Vent Free Gas Logs",
      "slug": "vent-free-gas-logs"
  },
  {
      "name": "Vented Gas Logs",
      "slug": "vented-gas-logs"
  },
  {
      "name": "Inserts",
      "slug": "inserts"
  },
  {
      "name": "Fireplace",
      "slug": "fireplace"
  },
  {
      "name": "Stoves",
      "slug": "stoves"
  },
  {
      "name": "Remote Controls",
      "slug": "remote-controls"
  },
  {
      "name": "Electric Fireplace",
      "slug": "electric-fireplace"
  },
  {
      "name": "Electric Fireplace Accessory",
      "slug": "electric-fireplace-accessory"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Hearth Equipment Subcategory ID
  const heartequipmentCategory = await prisma.category.findUnique({
    where: { slug: "hearth-equipment" },
});

  if (heartequipmentCategory) {

    await prisma.category.createMany({
      data: hearthequipmentSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: heartequipmentCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(hearthequipmentSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
