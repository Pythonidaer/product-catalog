const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Debug slugs and find duplicate

/**
 * Checks for duplicate slugs between the database and the provided data.
 * @param {Array} subcategories - The array of subcategory objects to check.
 * @returns {Promise<Array>} - Returns a list of duplicate slugs.
 */
const findDuplicateSlugs = async (subcategories) => {
  try {
    // Fetch existing slugs from the database
    const existingSlugs = await prisma.category.findMany({
      select: { slug: true },
    });

    console.log(
      "🔥 Existing slugs in database:",
      existingSlugs.map((cat) => cat.slug)
    );
    console.log(
      "🔍 Slugs attempting to be inserted:",
      subcategories.map((cat) => cat.slug)
    );

    // Normalize slugs before comparison
    const normalizeSlug = (slug) => slug.trim().toLowerCase();
    const existingSlugsSet = new Set(existingSlugs.map((cat) => cat.slug));

    // Filter duplicates from the provided subcategories
    // Find duplicates
    const duplicates = subcategories.filter((subcategory) =>
      existingSlugsSet.has(normalizeSlug(subcategory.slug))
    );

    console.log("🚨 Duplicates detected:", duplicates.map((cat) => cat.slug));

    // Return the list of duplicate slugs
    return duplicates.map((cat) => cat.slug);
  } catch (error) {
    console.error("❌ Error checking duplicate slugs:", error);
    return [];
  }
};

module.exports = findDuplicateSlugs;
