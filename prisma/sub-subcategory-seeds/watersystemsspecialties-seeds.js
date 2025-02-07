const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const watersystemsspecialtiesSubcategories = [
    {
        "name": "Drilling Products",
        "slug": "drilling-products"
    },
    {
        "name": "In Line Heat Cable",
        "slug": "in-line-heat-cable"
    },
    {
        "name": "Irrigation",
        "slug": "irrigation"
    },
    {
        "name": "Other Water Systems Products",
        "slug": "other-water-systems-products"
    },
    {
        "name": "Pressure Switches & Controls",
        "slug": "pressure-switches-and-controls"
    },
    {
        "name": "Reverse Osmosis",
        "slug": "reverse-osmosis"
    },
    {
        "name": "Salt & Potassium Permanaganate",
        "slug": "salt-and-potassium-permanaganate"
    },
    {
        "name": "Septic Tanks",
        "slug": "septic-tanks"
    },
    {
        "name": "Submersible Wire",
        "slug": "submersible-wire"
    },
    {
        "name": "Submersible Wire Accessories",
        "slug": "submersible-wire-accessories"
    },
    {
        "name": "Water Softeners",
        "slug": "water-softeners"
    },
    {
        "name": "Water Storage Tanks",
        "slug": "water-storage-tanks\t"
    },
    {
        "name": "Water System Chemicals",
        "slug": "water-system-chemicals"
    },
    {
        "name": "Well Accessories",
        "slug": "well-accessories"
    },
    // Plumbing Cat
    // {
    //     "name": "Well Tanks",
    //     "slug": "well-tanks"
    // },
    {
        "name": "Yard Hydrants",
        "slug": "yard-hydrants"
    }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Water Systems Specialties Subcategory ID
  const watersystemsCategory = await prisma.category.findUnique({
    where: { slug: "water-systems-specialties" },
  });

  if (watersystemsCategory) {

    await prisma.category.createMany({
      data: watersystemsspecialtiesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: watersystemsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(watersystemsspecialtiesSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
