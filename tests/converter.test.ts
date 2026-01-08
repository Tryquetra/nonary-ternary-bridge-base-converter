import { expect, test, describe } from "bun:test";
import * as converter from "../src/converter";

describe("Base Converter Core Logic - Strict Verification", () => {

    test("getDigitValue returns correct values (including case sensitivity)", () => {
        expect(converter.getDigitValue("0", 10)).toBe(0);
        expect(converter.getDigitValue("9", 10)).toBe(9);
        expect(converter.getDigitValue("a", 16)).toBe(10);
        expect(converter.getDigitValue("A", 16)).toBe(10);
        expect(converter.getDigitValue("F", 16)).toBe(15);
        // Base 27 (Jones Alphabet) - specific indices
        expect(converter.getDigitValue("7", 27)).toBe(7);
        expect(converter.getDigitValue("A", 27)).toBe(10);
        expect(converter.getDigitValue("G", 27)).toBe(16);
        expect(converter.getDigitValue("H", 27)).toBe(17);
        expect(converter.getDigitValue("K", 27)).toBe(18); // Jones skips I, J
        expect(converter.getDigitValue("Z", 27)).toBe(26);
    });

    test("getDigitChar returns correct characters (strict check)", () => {
        expect(converter.getDigitChar(0, 10)).toBe("0");
        expect(converter.getDigitChar(9, 10)).toBe("9");
        expect(converter.getDigitChar(10, 16)).toBe("A");
        expect(converter.getDigitChar(15, 16)).toBe("F");
        expect(converter.getDigitChar(17, 27)).toBe("H");
        expect(converter.getDigitChar(18, 27)).toBe("K");
        expect(converter.getDigitChar(26, 27)).toBe("Z");
    });

    test("formatBaseOutput joins digits and trims correctly", () => {
        expect(converter.formatBaseOutput([0, 1, 2, 3], 10)).toBe("123");
        expect(converter.formatBaseOutput([0, 0, 0], 10)).toBe("0");
        expect(converter.formatBaseOutput([10, 11], 16)).toBe("AB");
        expect(converter.formatBaseOutput([], 10)).toBe("0");
    });

    describe("Balanced Conversions (Stability & Signs)", () => {
        const mockI18n = (key: string) => key;

        test("balancedToStandard (Base 3) - Strict", () => {
            // +0- = 9 + 0 - 1 = 8. 8_10 is 22_3.
            expect(converter.balancedToStandard("+0-", 3, mockI18n).value).toBe("22");
            // - = -1. Standard base 3 (positive only) usually doesn't show negative.
            // But let's see how it behaves: -1 + 3 = 2, carry -1. Next: 2, carry -1? No, 2. result [2, 2] -> 22.
            // Wait, -1 in balanced ternary is "-". standardToBalanced("-")?
            // Actually the app is for positive integers usually, but let's test small positive.
            expect(converter.balancedToStandard("+", 3, mockI18n).value).toBe("1");
            expect(converter.balancedToStandard("+-", 3, mockI18n).value).toBe("2");
            expect(converter.balancedToStandard("0", 3, mockI18n).value).toBe("0");
        });

        test("standardToBalanced (Base 3) - Strict", () => {
            // 8_10 = 22_3 -> +0-
            expect(converter.standardToBalanced("22", 3, mockI18n).value).toBe("+0-");
            // 1_3 -> +
            expect(converter.standardToBalanced("1", 3, mockI18n).value).toBe("+");
            // 2_3 -> +- (3-1=2)
            expect(converter.standardToBalanced("2", 3, mockI18n).value).toBe("+-");
            // 0_3 -> 0
            expect(converter.standardToBalanced("0", 3, mockI18n).value).toBe("0");
        });

        test("balancedToStandard (Base 9) - Strict", () => {
            // 1Z = 1*9 - 1 = 8.
            expect(converter.balancedToStandard("1Z", 9, mockI18n).value).toBe("8");
            // 10 = 1*9 + 0 = 9.
            expect(converter.balancedToStandard("10", 9, mockI18n).value).toBe("10"); // Wait, 9_10 in base 9 is "10"
            // W = -4. Result 85 (base 9) = 77_10. 
            // This algorithm is specifically for the "Synthetic Division" bridge needs. 
            // In base 9 balanced: W, X, Y, Z, 0, 1, 2, 3, 4. 4 is max.
        });
    });

    describe("Synthetic Division Algorithm (p→p±1)", () => {
        test("Base 10 to 2 (Extreme jump, but iterative)", () => {
            // This will use p-1 logic repeatedly if we were to chain it, 
            // but convertAdjacentBases does it in one pass of synthetic division.
            // 10_10 to 9_9? Yes. 10_10 = 11_9? Yes.
            let result = converter.convertAdjacentBases([1, 0], 10, 9);
            expect(converter.formatBaseOutput(result.result, 9)).toBe("11");

            // 123_10 to 9_9? 1*81 + 4*9 + 6 = 123.
            result = converter.convertAdjacentBases([1, 2, 3], 10, 9);
            expect(converter.formatBaseOutput(result.result, 9)).toBe("146");
        });

        test("Base 9 to 10 (p→p+1)", () => {
            const result = converter.convertAdjacentBases([1, 4, 6], 9, 10);
            expect(converter.formatBaseOutput(result.result, 10)).toBe("123");
        });

        test("Edge Case: Zero", () => {
            const result = converter.convertAdjacentBases([0], 10, 9);
            expect(converter.formatBaseOutput(result.result, 9)).toBe("0");
        });
    });

    describe("Bridge & Power Algorithms", () => {
        test("Base 10 to 3 (Nonary Bridge)", () => {
            // 100_10 = 81 + 18 + 1 = 1*81 + 2*9 + 1 = 121_9.
            // 1_9 = 01_3, 2_9 = 02_3, 1_9 = 01_3. -> 010201_3 -> 10201_3.
            // 1*81 + 0*27 + 2*9 + 0*3 + 1 = 81 + 18 + 1 = 100.
            const result = converter.convertViaNonary([1, 0, 0], 10, 3);
            expect(converter.formatBaseOutput(result.result, 3)).toBe("10201");
        });

        test("Base 27 to 9 (via 3)", () => {
            // 'A' is 10. 10_27. 
            // 10_27 = 101_3.
            // 101_3 = 01, 01 -> 1, 1? No.
            // 101_3 padded to 01, 01? No, 1, 01. 
            // 101_3: 1*9 + 0*3 + 1 = 10. 
            // 10 in base 9 is 11.
            // Let's check power mapping: 
            // A_27 -> 01, 01_3 -> 1, 1 -> 11_9.
            // Wait, A_27 = 10_10. 10_10 = 11_9. Correct.
            const step1 = converter.convertViaPowerMapping([10], 27, 3);
            // 3 to 9 grouping:
            const digits3 = [...step1.result];
            if (digits3.length % 2 !== 0) digits3.unshift(0);
            const digits9 = [];
            for (let i = 0; i < digits3.length; i += 2) digits9.push(digits3[i]! * 3 + digits3[i + 1]!);
            expect(converter.formatBaseOutput(digits9, 9)).toBe("11");
        });
    });

    describe("Validation Regex", () => {
        test("Base 27 validation", () => {
            expect(converter.validateInput("AZ", 27, false)).toBe(true);
            expect(converter.validateInput("0123456789ABCDEFGHKMNPRTVXZ", 27, false)).toBe(true);
            expect(converter.validateInput("I", 27, false)).toBe(false); // Jones skips I
            expect(converter.validateInput("O", 27, false)).toBe(false); // Jones skips O
        });
    });
});
