//First Bring A Mock to your application
const express = require("express");
const request = require("supertest");
const bookRoute = require("../routes/books.routes");

const app = express();

app.use(express.json());

app.use("/api/books", bookRoute);

describe("Test Integration for books API", () => {
  //api --- status --- describe
  it("GET /api/books -- success get all the books", async () => {
    var { body, statusCode } = await request(app).get("/api/books");

    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          author: expect.any(String),
        }),
      ])
    );
    expect(statusCode).toBe(200);
  });

  it("POST /api/books -- failure on invalid post body", async () => {
    var { body, statusCode } = await request(app).post("/api/books").send({
      name: "",
      author: "john doe",
    });

    console.log(body);
    expect(statusCode).toBe(400);
    expect(body).toEqual({
      errors: [
        {
          location: "body",
          msg: "Book name is required",
          param: "name",
          value: "",
        },
      ],
    });
  });

  //   it("POST /api/books ---success add new book", async () => {
  //     var { body, statusCode } = await request(app).post("/api/books").send({
  //       name: "ikaie",
  //       author: "john doe",
  //     });

  //     expect(statusCode).toBe(200);
  //     expect(body).toEqual({
  //       message: "Success",
  //     });
  //   });

  it("UPDATE /api/books/id -- failure when bok is not found", async () => {
    const { body, statusCode } = await request(app).put("/api/books/500").send({
      name: "day",
      author: "john Begot",
    });

    expect(statusCode).toBe(404);
    expect(body).toEqual({
      error: true,
      message: "Book not found",
    });
  });

  it("UPDATE /api/books/id -- successfully update book", async () => {
    const { body, statusCode } = await request(app).put("/api/books/2").send({
      name: "day in life of",
      author: "john Begot",
    });

    expect(statusCode).toBe(201);
    expect(body).toEqual({
      name: "day in life of",
      author: "john Begot",
      id: 2,
    });
  });
});
