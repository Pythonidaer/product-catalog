const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const steamSubcategories = [
    {
        "name": "Steam Traps",
        "slug": "steam-traps"
    },
    {
        "name": "Steam Trap Parts",
        "slug": "steam-trap-parts"
    },
    // Plumbing valves Subcat
    // {
    //     "name": "Regulators",
    //     "slug": "pressure-regulators"
    // },
    {
        "name": "Regulator Parts",
        "slug": "regulator-parts-and-accessories"
    },
    {
        "name": "Separators & Drainers",
        "slug": "separators-and-drainers"
    },
    {
        "name": "Air Vent & Vacuums",
        "slug": "air-vent-and-vacuum-breakers"
    }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Steam Subcategory ID
  const steamCategory = await prisma.category.findUnique({
    where: { slug: "steam" },
});

  if (steamCategory) {

    await prisma.category.createMany({
      data: steamSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: steamCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(steamSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
