const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubSubcategories() {
  console.log("🔄 Seeding subsubcategories...");

  // Get Nipples Subcategory ID
  const nipplesCategory = await prisma.category.findUnique({
    where: { slug: "nipples" },
  });

  if (nipplesCategory) {
    const nipplesSubcategory = [
        {
            "name": "Black Nipples",
            "slug": "black-nipples"
        },
        {
            "name": "Brass Nipples",
            "slug": "brass-nipples"
        },
        {
            "name": "Galvanized Nipples",
            "slug": "galvanized-nipples"
        },
        {
            "name": "Stainless Steel Nipples",
            "slug": "stainless-steel-nipples"
        },
        {
            "name": "Nipple Packs",
            "slug": "nipple-packs"
        },
        {
            "name": "Nipple Job Trays",
            "slug": "nipple-job-trays"
        }
    ];

    await prisma.category.createMany({
      data: nipplesSubcategory.map((subcategory) => ({
        ...subcategory,
        parentId: nipplesCategory.id,
      })),
    });
  }

  console.log("✅ Subsubcategories seeded successfully!");
}

seedSubSubcategories()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
