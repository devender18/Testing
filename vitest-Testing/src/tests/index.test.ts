import { describe, expect, it, vi} from "vitest";
import { app } from "../index";
import request from 'supertest';
import { prisma } from "../__mocks__/db"
// import { prisma } from '../db';

// -- required when used normal mock
// vi.mock('../db',()=>({
//     prisma : {sum : { create : vi.fn() }}
// }))

// -- deep mock, we don't have to define the key from our selves
vi.mock('../db')

describe(' POST/ sum', ()=>{
    it("should return sum of two number", async ()=>{

        prisma.sum.create.mockResolvedValue({
            id : 1,
            a : 1,
            b : 4,
            result : 5
        })
        
        vi.spyOn(prisma.sum, "create");

        const res = await request(app).post("/sum").send({
            a : 1,
            b : 4
        });

        expect(prisma.sum.create).toBeCalledWith({
            data:{
                a : 1,
                b : 4,
                result: 5
            }
        })

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

