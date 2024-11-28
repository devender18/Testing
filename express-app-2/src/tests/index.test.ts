import { describe, expect, it} from "@jest/globals";
import { app } from "../index";
import request from 'supertest';

describe(' POST/ sum', ()=>{
    it("should return sum of two number", async ()=>{
        const res = await request(app).post("/sum").send({
            a : 1,
            b : 4
        });

        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(5);
    })
})

describe(" GET /sum", ()=>{
    it("should return a + b", async()=>{
        const res = await request(app).get('/sum').set({
            a : "3",
            b : "4"
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(7);
    })

    it("should return 411 if no inputs are provided", async()=>{
        const res = await request(app).get('/sum').set({});

        expect(res.statusCode).toBe(411);
    })
})

