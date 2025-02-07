const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const oilheatingSpecialtiesSubcategories = [
  {
      "name": "Oil Burners",
      "slug": "oil-burners"
  },
  {
      "name": "Oil Controls",
      "slug": "oil-controls"
  },
  {
      "name": "Ignitors",
      "slug": "ignitors"
  },
  {
      "name": "Burner Tubes",
      "slug": "burner-tubes"
  },
  {
      "name": "Oil Pumps",
      "slug": "oil-pumps"
  },
  {
      "name": "Combustion Heads",
      "slug": "combustion-heads"
  },
  {
      "name": "Oil Filters",
      "slug": "oil-filters"
  },
  {
      "name": "Oil Burner Motors",
      "slug": "oil-burner-motors"
  },
  {
      "name": "Oil Tank Supplies",
      "slug": "oil-tank-supplies"
  },
  {
      "name": "Cad Cells",
      "slug": "cad-cells"
  },
  {
      "name": "Oil Nozzles",
      "slug": "oil-nozzles"
  },
  {
      "name": "Electrode Kits",
      "slug": "electrode-kits"
  },
  {
      "name": "Firomatic",
      "slug": "firomatic"
  },
  {
      "name": "Coupling Kits",
      "slug": "coupling-kits"
  },
  {
      "name": "Tigerloop",
      "slug": "tigerloop"
  },
  {
      "name": "Oil Line",
      "slug": "oil-line"
  },
  {
      "name": "Spill Containment",
      "slug": "spill-containment"
  },
  {
      "name": "Other Oil Heating Products",
      "slug": "other-oil-heating-products"
  },
  {
      "name": "Oil Safety Valves",
      "slug": "oil-safety-valves"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Oil Heating Specialties Subcategory ID
  const oilheatingspecialtiesCategory = await prisma.category.findUnique({
    where: { slug: "oil-heating-specialties" },
  });

  if (oilheatingspecialtiesCategory) {

    await prisma.category.createMany({
      data: oilheatingSpecialtiesSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: oilheatingspecialtiesCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(oilheatingSpecialtiesSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
