const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const oemboilerpartsSubcategory = [
  {
      name: "OEM Boiler Parts - Advantage",
      slug: "oem-boiler-parts---advantage"
  },
  {
      name: "OEM Boiler Parts - Trio Residential",
      slug: "oem-boiler-parts---trio-residential"
  },
  {
      name: "OEM Boiler Parts - Burnham",
      slug: "oem-boiler-parts---burnham"
  },
  {
      name: "OEM Boiler Parts - Lochinvar",
      slug: "oem-boiler-parts---lochinvar"
  },
  {
      name: "OEM Boiler Parts - Ideal",
      slug: "oem-boiler-parts---ideal"
  },
  {
      name: "OEM Boiler Parts - Navien",
      slug: "oem-boiler-parts---navien"
  },
  {
      name: "OEM Boiler Parts - HTP",
      slug: "oem-boiler-parts---htp"
  },
  {
      name: "OEM Boiler Parts - Bradford White",
      slug: "oem-boiler-parts---bradford-white"
  },
  {
      name: "OEM Boiler Parts - Weil Mclain",
      slug: "oem-boiler-parts---weil-mclain"
  },
  {
      name: "OEM Boiler Parts - Bosch/Buderus",
      slug: "oem-boiler-parts---bosch-buderus"
  },
  {
      name: "OEM Boiler Parts - Modine",
      slug: "oem-boiler-parts---modine"
  },
  {
      name: "OEM Boiler Parts - Laars",
      slug: "oem-boiler-parts---laars"
  },
  {
      name: "OEM Boiler Parts - Peerless",
      slug: "oem-boiler-parts---peerless"
  },
  {
      name: "OEM Boiler Parts - Thermopride",
      slug: "oem-boiler-parts---thermopride"
  },
  {
      name: "OEM Boiler Parts - Triangle Tube",
      slug: "oem-boiler-parts---triangle-tube"
  },
  {
      name: "OEM Boiler Parts - Rinnai",
      slug: "oem-boiler-parts---rinnai"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get OEM Boiler Parts Subcategory ID
  const oemboilerpartsCategory = await prisma.category.findUnique({
    where: { slug: "oem-boiler-parts" },
  });

  if (oemboilerpartsCategory) {

    await prisma.category.createMany({
      data: oemboilerpartsSubcategory.map((subcategory) => ({
        ...subcategory,
        parentId: oemboilerpartsCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(oemboilerpartsSubcategory);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
