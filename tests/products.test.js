const request = require("supertest");
const prisma = require("./setup");
const app = require("../app/index");

describe("Products API", () => {
  test("GET /api/products should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/products/:id should return a single product", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Test Product");
  });
});
