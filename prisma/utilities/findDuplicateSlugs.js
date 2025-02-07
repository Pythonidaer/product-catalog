const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Debug slugs and find duplicate

/**
 * Checks for duplicate slugs between the database and the provided data.
 * @param {Array} subcategories - The array of subcategory objects to check.
 * @returns {Promise<Array>} - Returns a list of duplicate slugs.
 */
const findDuplicateSlugs = async (subcategories) => {
  // Fetch existing slugs from the database
  const existingSlugs = await prisma.category.findMany({
    select: { slug: true },
  });

  const existingSlugsSet = new Set(existingSlugs.map((cat) => cat.slug));

  // Filter duplicates from the provided subcategories
  const duplicates = subcategories.filter((subcategory) =>
    existingSlugsSet.has(subcategory.slug)
  );

  // console.log(
  //   "Existing duplicate slugs:",
  //   duplicates.map((cat) => cat.slug)
  // );

  // Return the list of duplicate slugs
  return duplicates.map((cat) => cat.slug);
};

module.exports = findDuplicateSlugs;
