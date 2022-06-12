const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

/**
 * to make db connection stay
 * alive put describe block into another describe block
 * This helps the beforeAll statement run for all test
 */

describe("Lanuches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launched", () => {
    test("It should respong with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      //using jest syntax below
      // expect(response.statusCode).toBe(200);
    });
  });

  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "ZTM155",
      rocket: "ZMT RExperiment 15",
      target: "Kepler-62 f",
      launchDate: "january 1, 2030",
    };
    const launchWithoutData = {
      mission: "ZTM155",
      rocket: "ZMT RExperiment 15",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "ZTM155",
      rocket: "ZMT RExperiment 15",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };

    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
      //To check res.Body Use Jest Assersions
      expect(response.body).toMatchObject(launchWithoutData);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchWithoutData)
        .expect("Content-Type", /json/)
        .expect(400);

      //Using Jest Assersions
      expect(response.body).toStrictEqual({
        error: "Missing Required Lanuch Property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch Date",
      });
    });
  });
});
