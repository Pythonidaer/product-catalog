const { PrismaClient } = require('@prisma/client');
const findDuplicateSlugs = require('../utilities/findDuplicateSlugs');
const prisma = new PrismaClient();

const unitheatersSubcategories = [
  {
      name: "Unit Heaters - Hydronic",
      slug: "unit-heaters---hydronic"
  },
  {
      name: "Unit Heaters - Propane",
      slug: "unit-heaters---propane"
  },
  {
      name: "Unit Heaters - Natural Gas",
      slug: "unit-heaters---natural-gas"
  },
  {
      name: "Infrared Tube Heaters- Propane",
      slug: "infrared-unit-heaters---propane"
  },
  {
      name: "Infrared Tube Heaters- Natural Gas",
      slug: "infrared-unit-heaters---natural-gas"
  },
  {
      name: "Unit Heaters - Oil",
      slug: "unit-heaters---oil"
  },
  {
      name: "Unit Heaters - Electric",
      slug: "unit-heaters---electric"
  },
  {
      name: "High Intensity Radiant Heaters - Propane",
      slug: "---propane"
  },
  {
      name: "High Intensity Radiant Heaters - Natural Gas",
      slug: "---natural-gas"
  },
  {
      name: "Unit Heater Parts & Accessories",
      slug: "unit-heater-parts-and-accessories"
  }
];

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Unit Heaters Subcategory ID
  const unitheatersCategory = await prisma.category.findUnique({
    where: { slug: "unit-heaters" },
  });

  if (unitheatersCategory) {

    await prisma.category.createMany({
      data: unitheatersSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: unitheatersCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch(async (e) => {
    console.error("❌ Seeding failed: ", e);
    const duplicates = await findDuplicateSlugs(unitheatersSubcategories);
    console.error("Duplicates identified on failure:", duplicates);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
