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
            expect(converter.balancedToStandard("+0-", 3, mockI18n).value).toBe("22");
            expect(converter.balancedToStandard("+", 3, mockI18n).value).toBe("1");
            expect(converter.balancedToStandard("+-", 3, mockI18n).value).toBe("2");
            expect(converter.balancedToStandard("0", 3, mockI18n).value).toBe("0");
        });

        test("standardToBalanced (Base 3) - Strict", () => {
            expect(converter.standardToBalanced("22", 3, mockI18n).value).toBe("+0-");
            expect(converter.standardToBalanced("1", 3, mockI18n).value).toBe("+");
            expect(converter.standardToBalanced("2", 3, mockI18n).value).toBe("+-");
            expect(converter.standardToBalanced("0", 3, mockI18n).value).toBe("0");
        });

        test("balancedToStandard (Base 9) - Strict", () => {
            expect(converter.balancedToStandard("1Z", 9, mockI18n).value).toBe("8");
            expect(converter.balancedToStandard("10", 9, mockI18n).value).toBe("10");
        });

        test("invertBalanced reverses signs", () => {
            expect(converter.invertBalanced("+0-", 3)).toBe("-0+");
            expect(converter.invertBalanced("-+-", 3)).toBe("+-+");

            // Base 9: 4 <-> W, 3 <-> X, 2 <-> Y, 1 <-> Z
            expect(converter.invertBalanced("4", 9)).toBe("W");
            expect(converter.invertBalanced("W", 9)).toBe("4");
            expect(converter.invertBalanced("123", 9)).toBe("ZYX");
            expect(converter.invertBalanced("XYZ", 9)).toBe("321");
            expect(converter.invertBalanced("0", 9)).toBe("0");
            // Mixed
            expect(converter.invertBalanced("1W0", 9)).toBe("Z40");
        });
    });

    describe("Synthetic Division Algorithm (p→p±1)", () => {
        test("Base 10 to 2 (Extreme jump, but iterative)", () => {
            let result = converter.convertAdjacentBases([1, 0], 10, 9);
            expect(converter.formatBaseOutput(result.result, 9)).toBe("11");

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
            const result = converter.convertViaNonary([1, 0, 0], 10, 3);
            expect(converter.formatBaseOutput(result.result, 3)).toBe("10201");
        });

        test("Base 27 to 9 (via 3)", () => {
            const step1 = converter.convertViaPowerMapping([10], 27, 3);
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
            expect(converter.validateInput("-AZ", 27, false)).toBe(true);
            expect(converter.validateInput("0123456789ABCDEFGHKMNPRTVXZ", 27, false)).toBe(true);
            expect(converter.validateInput("I", 27, false)).toBe(false);
            expect(converter.validateInput("O", 27, false)).toBe(false);
        });

        test("Negative number validation (Standard)", () => {
            expect(converter.validateInput("-10", 10, false)).toBe(true);
            expect(converter.validateInput("-A", 16, false)).toBe(true);
            expect(converter.validateInput("-", 10, false)).toBe(false); // Just a sign is invalid
            expect(converter.validateInput("10-", 10, false)).toBe(false); // Sign in middle/end
            expect(converter.validateInput("--10", 10, false)).toBe(false); // Double sign
        });
    });

    describe("Formatting Edge Cases", () => {
        const mockI18n = (key: string) => key;

        test("standardToBalanced (Base 3) formats '000' as '0'", () => {
            const result = converter.standardToBalanced("000", 3, mockI18n);
            expect(result.value).toBe("0");
        });

        test("formatBaseOutput (Standard) formats '000' as '0'", () => {
            expect(converter.formatBaseOutput([0, 0, 0], 10)).toBe("0");
        });

        test("balancedToStandard throws on invalid digit", () => {
            expect(() => converter.balancedToStandard("2", 3, mockI18n)).toThrow("Invalid balanced digit: 2");
        });
    });
});
