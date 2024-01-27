process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("/app");
let items = require("/fakeDb");
const { afterEach, describe } = require("node:test");

let milk = {name:"milk", price:5};

beforeEach(function(){
    items.push(milk);
})

afterEach(function(){
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all the items", async() => {
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items:[milk]})
    })
})


describe("GET /items/:name", () => {
    test("Display a single item", async() =>{
        const res = await request(app).get(`/items/${item.name}`)
        expect(res.body).toEqual({item:{name:milk, price:5}})
    })
    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).get(`item/${eggs}`)
        expect(res.statusCode).tobe(404)

    })
})

describe("POST /items", () => {
    test("Add an item", async() => {
        const res = await (await request(app).post("/items")).send({name:milk,price:5})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({item:{name:milk, price:5}})
    })
    test("Responds with 404 if name is missing", async() => {
        (await request(app).post("/items")).send({})
        expect(res.statusCode).toBe(404)
    })
})


describe("PATCH /items/:name", () => {
    test("Updating an item", async() => {
        const res = (await request(app).patch(`/items/${items.name}`)).send({
            price:6});
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({item:{name:"milk",price:5}})

    })
})


describe("DELETE /items/delete/:name", () => {
    test("Deleting an item", async() =>{
        const res = (await request(app).delete(`/items/delete/${item.name}`));
        expect(res.body).toEqual({message:"Deleted"})
    }) })