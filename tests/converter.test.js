import { expect, test, describe } from "bun:test";
import { performFullConversion } from "../converter-logic.js";

describe("Nonary Base Converter - Comprehensive TDD Suite", () => {

    describe("Identity & Simple Conversions", () => {
        test("Identity: 1234 (Base 10) -> 1234 (Base 10)", () => {
            expect(performFullConversion("1234", 10, 10, false, false)).toBe("1234");
        });

        test("Adjacent: 10 (Base 10) -> 11 (Base 9)", () => {
            expect(performFullConversion("10", 10, 9, false, false)).toBe("11");
        });

        test("Adjacent: 11 (Base 9) -> 10 (Base 10)", () => {
            expect(performFullConversion("11", 9, 10, false, false)).toBe("10");
        });
    });

    describe("Power Mappings (Potências de 3)", () => {
        test("3 to 9: 12 (Base 3) -> 5 (Base 9)", () => {
            expect(performFullConversion("12", 3, 9, false, false)).toBe("5");
        });

        test("9 to 3: 5 (Base 9) -> 12 (Base 3)", () => {
            expect(performFullConversion("5", 9, 3, false, false)).toBe("12");
        });

        test("27 to 3: G (Base 27, 16) -> 121 (Base 3)", () => {
            // 1*9 + 2*3 + 1*1 = 9 + 6 + 1 = 16
            expect(performFullConversion("G", 27, 3, false, false)).toBe("121");
        });

        test("3 to 27: 121 (Base 3) -> G (Base 27)", () => {
            expect(performFullConversion("121", 3, 27, false, false)).toBe("G");
        });
    });

    describe("Bridges (Pontes Otimizadas)", () => {
        test("Nonary Bridge: 10 (Base 10) -> 101 (Base 3)", () => {
            // 10 -> 11 (base 9) -> 0101 (base 3) -> 101
            expect(performFullConversion("10", 10, 3, false, false)).toBe("101");
        });

        test("Double Bridge: 10 (Base 10) -> 1010 (Base 2)", () => {
            expect(performFullConversion("10", 10, 2, false, false)).toBe("1010");
        });

        test("Double Bridge Reverse: 1010 (Base 2) -> 10 (Base 10)", () => {
            expect(performFullConversion("1010", 2, 10, false, false)).toBe("10");
        });

        test("Ternary Bridge: 9 (Base 9) -> 1001 (Base 2)", () => {
            // 9 (base 9) -> 10 (base 9 char) -> 1000 (base 3) -> 1001 (base 2) is WRONG.
            // 9 nonary is '10' (1*9 + 0). 
            // '10' nonary -> '0100' ternary -> 9 decimal. 
            // 9 decimal -> 1001 binary.
            expect(performFullConversion("10", 9, 2, false, false)).toBe("1001");
        });
    });

    describe("Negative Numbers & Balanced Systems", () => {
        test("Negative Standard: -10 (Base 10) -> -1010 (Base 2)", () => {
            expect(performFullConversion("-10", 10, 2, false, false)).toBe("-1010");
        });

        test("Standard to Balanced Ternary: 10 (Base 10) -> +0+ (Base 3 Bal)", () => {
            // 10 = 9 + 1 = 3^2 + 3^0
            expect(performFullConversion("10", 10, 3, false, true)).toBe("+0+");
        });

        test("Standard to Balanced Ternary: -10 (Base 10) -> -0- (Base 3 Bal)", () => {
            expect(performFullConversion("-10", 10, 3, false, true)).toBe("-0-");
        });

        test("Balanced to Standard: -0- (Base 3 Bal) -> -10 (Base 10)", () => {
            expect(performFullConversion("-0-", 3, 10, true, false)).toBe("-10");
        });

        test("Standard to Symmetric Nonary: 5 (Base 10) -> 1Z (9-1)", () => {
            // 5 = 1*9 - 4? No. 5 = 1*9 + Z? Z is -1, so 1Z = 8.
            // 5 = 5. In symmetric nonary, 5 is not a single digit (0-4).
            // 5 = 1*9 - 4 = 1W.
            expect(performFullConversion("5", 10, 9, false, true)).toBe("1W");
        });

        test("Balanced Nonary Neg: -5 (Base 10) -> Z4", () => {
            // 5 is 1W. Inverse of 1W is Z4.
            expect(performFullConversion("-5", 10, 9, false, true)).toBe("Z4");
        });
    });
});
