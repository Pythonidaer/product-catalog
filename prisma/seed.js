const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Product 1", description: "A test product", price: 12.99 },
      { name: "Product 2", description: "Another test product", price: 24.99 },
    ],
  });
}

main()
  .then(() => console.log("Database seeded successfully"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());