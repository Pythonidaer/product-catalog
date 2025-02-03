const request = require("supertest");
const prisma = require("./setup");
const app = require("../app/index");

describe("Categories API", () => {
  test("GET /api/categories should return all categories", async () => {
    const res = await request(app).get("/api/categories");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
