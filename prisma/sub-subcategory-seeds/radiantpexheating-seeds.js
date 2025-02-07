const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const radiantpexheatingSubcategories = [
  {
      name: "Radiant Pex Tubing",
      slug: "radiant-pex-tubing"
  },
  {
      name: "Radiant Pex Fittings",
      slug: "radiant-pex-fittings"
  },
  {
      name: "Radiant Pex Controls",
      slug: "radiant-pex-controls"
  },
  {
      name: "Radiant Pex Manifolds",
      slug: "radiant-pex-manifolds"
  },
  {
      name: "Radiant Pex Panels",
      slug: "radiant-pex-panels"
  },
  {
      name: "Radiant Pex Supports",
      slug: "radiant-pex-supports"
  },
  {
      name: "Injection Mixers",
      slug: "injection-mixers"
  },
  {
      name: "Insultrap",
      slug: "insultrap"
  },
  {
      name: "Radiant Pex Fasteners",
      slug: "radiant-pex-fasteners"
  },
  {
      name: "Manifold Cabinets",
      slug: "manifold-cabinets"
  },
  {
      name: "Radiant Pex Insulation",
      slug: "radiant-pex-insulation"
  },
  {
      name: "Electric Radiant Mats",
      slug: "electric-radiant-mats"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Radiant Pex Heating Subcategory ID
  const radiantpexheatingCategory = await prisma.category.findUnique({
    where: { slug: "radiant-pex-heating" },
  });

  if (radiantpexheatingCategory) {

    await prisma.category.createMany({
      data: radiantpexheatingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: radiantpexheatingCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(radiantpexheatingSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
