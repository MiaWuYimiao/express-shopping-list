process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = {name: "pickle", price : 5.99 };

beforeEach(function() {
    items.push(item);
})

afterEach(function() {
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([item]);
    })
})

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(item);
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get("/items/esr");
        expect(res.statusCode).toBe(404)
    })
})

describe("POST /items", () => {
    test("Create an item", async () => {
        const res = await request(app).post("/items").send({name: "juice", price: 4.99});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({"added": {"name": "juice", "price": 4.99}});
    });
    test("Responds with 400 for invalid item", async () => {
        const res = await request(app).post("/items").send({});
        expect(res.statusCode).toBe(400);
    })
})

describe("PATCH /items/:name", () => {
    test("Update an item", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({name: "red pickle", price: 6.99});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"updated": {"name": "red pickle", "price": 6.99}});
    });
    test("Responds with 400 for invalid item", async () => {
        const res = await request(app).patch("/items/pickle").send({});
        expect(res.statusCode).toBe(400);
    })
})

describe("DELETE /items/:name", () => {
    test("Delete an item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message : "Deleted" });
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).delete("/items/efg");
        expect(res.statusCode).toBe(404);
    })
})
