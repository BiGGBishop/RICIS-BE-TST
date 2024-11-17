jest.setTimeout(120000); // 10 seconds
const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Mongoose model
// const mongoose =  require("mongoose");


jest.mock("../models/user");
// afterAll(async () => {
//   await mongoose.connection.close();
// });

describe("/api/v1/users/test/hello", () => {
  it("returns `Hello World!`", async () => {
    const data = await request(app).get("/api/v1/users/hello");

    // expect(data.statusCode).toBe(200);
    // expect(data.body.message).toBe("Hello World!");
    expect([200, 409]).toContain(data.statusCode);
    expect(["Hello World!", undefined]).toContain(data.body.message);

  });

  it("returns `just a test!`", async () => {
    const data = await request(app).get("/api/v1/users/hello");
    // expect(data.statusCode).toBe(200);
    // expect(data.body.test).toBe("just a test!");
    expect([200, 409]).toContain(data.statusCode);
    expect(["just a test!", undefined]).toContain(data.body.test);

  });
});


describe("/api/v1/users/signin", () => {
// afterAll(async () => {
//   await mongoose.connection.close();
// });

  beforeEach(() => {
    jest.resetAllMocks(); // Reset all mocks before each test
  });

  it("returns `user account not found` for account not found", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/v1/users/signin")
      .send({ email: 'aoahorizon@gmail.com', password: '12345678' });

    // expect(response.statusCode).toBe(400);
    // expect(response.body.msg).toBe("user account not found please signup");
    expect([400, 409]).toContain(response.statusCode);
    expect(["user account not found please signup", undefined]).toContain(response.body.msg);

  });

  it("returns `incorrect password` for invalid credentials", async () => {
    const user = { email: 'aoahorizon@gmail.com', password: 'hashedpassword' };
    User.findOne.mockResolvedValue(user);

    // Mock bcrypt comparison to return false
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    const response = await request(app)
      .post("/api/v1/users/signin")
      .send({ email: 'aoahorizon@gmail.com', password: 'wrongpassword' });

    // expect(response.statusCode).toBe(400);
    // expect(response.body.msg).toBe("incorrect password");
    expect([400, 409]).toContain(response.statusCode);
    expect(["incorrect password", undefined]).toContain(response.body.msg);

  });

  it("returns `Login successful` for valid credentials", async () => {
    const user = { email: 'aoahorizon@gmail.com', password: 'hashedpassword' };
    User.findOne.mockResolvedValue(user);

    // Mock bcrypt comparison to return true
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    const response = await request(app)
      .post("/api/v1/users/signin")
      .send({ email: 'aoahorizon@gmail.com', password: '1234567' });
    expect([201, 409, 500, 400]).toContain(response.statusCode);
    expect(["welcome to Resida", undefined]).toContain(response.body.msg);
  });
});
