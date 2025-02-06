const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSubcategories() {
  console.log("🔄 Seeding subcategories...");

  // Get Plumbing Supplies Category ID
  const plumbingCategory = await prisma.category.findUnique({
    where: { slug: "main-plumbing" },
  });

  if (plumbingCategory) {
    const plumbingSubcategories = [
      { name: "Faucets", slug: "faucets" },
      { name: "Water Heaters", slug: "water-heater-appliances" },
      { name: "Flush Valves", slug: "flush-valves" },
      { name: "Grease Traps & Interceptors", slug: "grease-traps-and-interceptors" },
      { name: "Sinks", slug: "sinks" },
      { name: "Garbage Disposals", slug: "garbage-disposals" },
      { name: "Valves & Stops", slug: "plumbing-valves" },
      { name: "Water Supplies", slug: "water-supplies" },
      { name: "Toilets", slug: "toilet-fixtures" },
      { name: "Water Filtration", slug: "water-filtration" },
      { name: "Drains", slug: "drains" },
      { name: "Toilet & Urinal Installation", slug: "toilet-urinal-installation" },
      { name: "Tub & Shower", slug: "tub-shower" },
      { name: "Pumps", slug: "pumps-plumbing" },
      { name: "Sillcocks & Hose Bibbs", slug: "sillcocks-and-hose-bibbs" },
      { name: "Outlet Boxes", slug: "fixture-and-appliance-outlet-boxes" },
      { name: "Urinals", slug: "urinals" },
      { name: "Expansion Tanks", slug: "expansion-tanks" },
      { name: "Water Hammer Arrestors", slug: "hammer-arrestors" },
      { name: "Access Panels", slug: "access-panels" },
      { name: "Dispensers", slug: "dispensers-soap" },
      { name: "Well Tanks", slug: "well-tanks" },
      { name: "Vacuum Breakers", slug: "vacuum-breakers" },
      { name: "Specialties", slug: "plumbing-specialties" },
      { name: "Water Coolers & Bottle Fillers", slug: "water-coolers-and-fountains" },
      { name: "Repair Parts", slug: "plumbing-repair-parts" },
      { name: "Clamps & Gaskets", slug: "clamps-and-gaskets" },
      { name: "Water Meters", slug: "water-meters" },
      { name: "Accessories", slug: "plumbing-accessories" },
      { name: "Chemicals", slug: "drain-cleaning" },
      { name: "Pex Tubing", slug: "pex-tubing" },
    ];

    await prisma.category.createMany({
      data: plumbingSubcategories.map((subcategory) => ({
        ...subcategory,
        parentId: plumbingCategory.id,
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
