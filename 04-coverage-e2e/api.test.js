const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("API Suite Test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const res = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(res.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route and redirect to /hello", async () => {
      const res = await request(app).get("/inexistentEndPoint").expect(200);
      assert.deepStrictEqual(res.text, "Hello World");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      const res = await request(app)
        .post("/login")
        .send({ username: "Pedrecal", password: "a1b2c3" })
        .expect(200);
      assert.deepStrictEqual(res.text, "Logged in successfully");
    });
  });

  describe("/login", () => {
    it("should fail to login and return HTTP Status 401", async () => {
      const res = await request(app)
        .post("/login")
        .send({ username: "H4ck3r", password: "a1b2c3" })
        .expect(401);

      assert.ok(res.unauthorized);
      assert.deepStrictEqual(res.text, "Failed to login");
    });
  });
});
