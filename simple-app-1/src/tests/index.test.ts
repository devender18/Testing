import {describe, expect, it} from "@jest/globals";
import { sum, multiply } from "./../index"

describe('Testing sum function', ()=>{
    it('adds 1 + 2 to equal 3', ()=>{
        expect(sum(1,2)).toBe(3)
    });

    it('add -1 and -3 to equals -4',()=>{
        expect(sum(-1,-3)).toBe(-4)
    });
});

describe('multiply test', ()=>{
    it('should give 2 * 5 equals to 10',()=>{
        expect(multiply(2,5)).toBe(10)
    })
})