const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Hardware Category ID
  const hardwareCategory = await prisma.category.findUnique({
    where: { slug: "main-hardware" },
  });

  if (hardwareCategory) {
    const hardwarSubcategories = [
      {
          name: "Bolts",
          slug: "bolts"
      },
      {
          name: "Cabinet Knobs, Pulls & Hinges",
          slug: "cabinet-knobs-pulls-and-hinges"
      },
      {
          name: "Cap Screws",
          slug: "cap-screws"
      },
      {
          name: "Fasteners",
          slug: "fasteners"
      },
      {
          name: "General Hardware",
          slug: "general-hardware"
      },
      // Omitted due to being a main Category
      // {
      //     name: "Hangers",
      //     slug: "main-hangers"
      // },
      {
          name: "Hose Clamps",
          slug: "hose-clamps"
      },
      {
          name: "Lag Screws",
          slug: "lag-screw"
      },
      {
          name: "Nuts",
          slug: "nuts"
      },
      {
          name: "Screws",
          slug: "screws"
      },
      {
          name: "Stud Bolts",
          slug: "stud-bolts"
      },
      {
          name: "Threaded Rod",
          slug: "threaded-rod"
      },
      {
          name: "U-Bolts",
          slug: "u-bolts"
      },
      {
          name: "Washers",
          slug: "washers"
      }
  ];

    await prisma.category.createMany({
      data: hardwarSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: hardwareCategory.id,
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


  /*

Here’s how you could handle this situation:

Short-Term Approach
Since Hangers is already a parent category, the easiest way to proceed is to comment out the object for now and add a note in your code explaining why it’s omitted. You can manually handle it later by:

Adding it as a link directly on the Hardware landing page.
Fetching it dynamically when building that page.

// { name: "Hangers", slug: "main-hangers" } 
// Omitted because it's a parent category. Handle manually on the Hardware page.
Mid-Term Approach: Add Links Dynamically
You can create a dynamic list of links for parent categories like Hangers to display on related landing pages (e.g., Hardware).

When fetching Hardware subcategories, you can:

Check if Hangers exists in the categories table as a parent.
Dynamically include it in the links list for the Hardware landing page.
Long-Term Approach: Cross-Referencing Parent Categories
You can explicitly associate parent categories with multiple landing pages by:

Creating a relation table or join table between categories to define where each parent or subcategory should appear.
Seeding that data so it’s reflected properly in the database.
For example:

Add a relatedLandingPages field or a join model like CategoryLandingPage:

model CategoryLandingPage {
  id         Int      @id @default(autoincrement())
  categoryId Int
  landingPageSlug String
  Category   Category @relation(fields: [categoryId], references: [id])
}
Use this to associate Hangers with Hardware while preserving its identity as a parent.
*/