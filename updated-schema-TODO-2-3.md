# Seeding a Prisma Database with Updated Models

## Step 1: Empty the Current Database
To start fresh with your database, follow these steps:

### 1.1 Reset the Database
Run the following Prisma command to reset your database:

```bash
npx prisma migrate reset
```

This command will:
- Drop all tables in your database.
- Reapply migrations to create a clean schema.
- Prompt you to confirm before erasing all data.

### 1.2 Confirm the Reset
Once prompted, type `y` to confirm the reset process.

---

## Step 2: Seed the Database with Sample Data
### 2.1 Create a Seed Script
In your `prisma` folder, create or edit the `seed.ts` file:

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categories
  const plumbing = await prisma.category.create({
    data: {
      name: "Plumbing",
      slug: "plumbing",
      description: "All plumbing-related products.",
    },
  });

  const waterHeaters = await prisma.category.create({
    data: {
      name: "Water Heater Appliances",
      slug: "water-heater-appliances",
      description: "Various water heaters and accessories.",
      parentId: plumbing.id,
    },
  });

  const residentialWaterHeaters = await prisma.category.create({
    data: {
      name: "Residential Tank Water Heaters",
      slug: "residential-tank-water-heaters",
      description: "Tank water heaters for residential use.",
      parentId: waterHeaters.id,
    },
  });

  // Brands
  const rheem = await prisma.brand.create({
    data: {
      name: "Rheem",
      slug: "rheem",
      logoUrl: "https://example.com/rheem-logo.png",
    },
  });

  // Products
  await prisma.product.create({
    data: {
      name: "Classic Water Heater",
      description: "A reliable water heater for residential use.",
      price: 499.99,
      sku: "PROG50S-40NRH61",
      slug: "classic-water-heater",
      imageUrl: "https://example.com/classic-water-heater.png",
      brandId: rheem.id,
      categoryId: residentialWaterHeaters.id,
      attributes: {
        create: [
          { key: "Capacity", value: "50 Gallons" },
          { key: "Fuel Type", value: "Natural Gas" },
          { key: "BTU", value: "40,000 BTU" },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### 2.2 Configure `package.json`
Ensure your `package.json` has the following script to run the seed file:

```json
{
  "prisma": {
    "seed": "ts-node --transpile-only prisma/seed.ts"
  }
}
```

### 2.3 Install Dependencies
If not already installed, add `ts-node` and `typescript`:

```bash
npm install ts-node typescript @types/node
```

---

### 2.4 Run the Seed Script
Run the following command to populate your database with the sample data:

```bash
npx prisma db seed
```

This will:
- Add hierarchical categories (e.g., Plumbing → Water Heater Appliances → Residential Tank Water Heaters).
- Insert brands (e.g., Rheem).
- Add products with attributes.

---

## Notes
- The hierarchical structure of categories (e.g., Plumbing → Water Heater Appliances → Residential Tank Water Heaters) is supported by the `parentId` field.
- Product attributes (e.g., Capacity, Fuel Type, BTU) are dynamically added using the `ProductAttribute` model.

Let me know if you'd like to further customize this setup or add additional models!
