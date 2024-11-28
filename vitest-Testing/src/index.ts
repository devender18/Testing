import express, { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from './db';

export const app = express();
app.use(express.json())

const sumInput = z.object({
    a : z.number(),
    b : z.number()
})


app.post("/sum",async (req: Request, res: any) =>{

    const parsedResponse = sumInput.safeParse(req.body);

    if (!parsedResponse.success){
        return res.status(411).json({
            "message" : "Invalid Inputs!"
        })
    }

    const ans = parsedResponse.data.a + parsedResponse.data.b;

    const request = await prisma.sum.create({
        data: {
            a : parsedResponse.data.a,
            b : parsedResponse.data.b,
            result : ans
        }
    })

    console.log(request.id)

    res.json({
        "answer" : ans
    })


});

app.get('/sum', (req: Request, res:any)=>{

    console.log(" -->", req.headers)
    const parsedResponse = sumInput.safeParse({
        a : Number(req.headers.a),
        b : Number(req.headers['b'])
    })


    if (!parsedResponse.success){
        return res.status(411).json({
            "msg" : "Input validation failed"
        })
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.json({
        answer
    })
});