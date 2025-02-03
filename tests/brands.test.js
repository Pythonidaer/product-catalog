const request = require("supertest");
const prisma = require("./setup");
const app = require("../app/index");

describe("Brands API", () => {
  test("GET /api/brands should return all brands", async () => {
    const res = await request(app).get("/api/brands");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
