/**
 * Mathematical Core for Nonary/Ternary Base Conversions
 * (c) 2025 Robson Cassiano
 */

export const HEPT_DIGITS = "0123456789ABCDEFGHKMNPRTVXZ";

export const balancedDigits = {
    3: { toStandard: { '-': -1, '0': 0, '+': 1 }, fromStandard: { '-1': '-', '0': '0', '1': '+' } },
    9: {
        toStandard: { 'W': -4, 'X': -3, 'Y': -2, 'Z': -1, '0': 0, '1': 1, '2': 2, '3': 3, '4': 4 },
        fromStandard: { '-4': 'W', '-3': 'X', '-2': 'Y', '-1': 'Z', '0': '0', '1': '1', '2': '2', '3': '3', '4': '4' }
    }
};

export const getDigitValue = (char, base) => {
    const c = char.toUpperCase();
    if (base === 27) return HEPT_DIGITS.indexOf(c);
    if (c >= '0' && c <= '9') return parseInt(c);
    return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
};

export const getDigitChar = (val, base) => {
    if (base === 27) return HEPT_DIGITS[val];
    if (val < 10) return val.toString();
    return String.fromCharCode('A'.charCodeAt(0) + val - 10);
};

export const formatBaseOutput = (arr, base) => {
    return arr.map(d => getDigitChar(d, base)).join('');
};

export const invertBalanced = (value, base) => {
    return value.split('').map(d => {
        if (d === '+') return '-';
        if (d === '-') return '+';
        if (base === 9) {
            const invMap = { '1': 'Z', '2': 'Y', '3': 'X', '4': 'W', 'Z': '1', 'Y': '2', 'X': '3', 'W': '4', '0': '0' };
            return invMap[d] || d;
        }
        return d;
    }).join('');
};

export const balancedToStandard = (value, base) => {
    const steps = [];
    const digits = value.split('').map(d => balancedDigits[base].toStandard[d]);
    const firstNonZero = digits.find(d => d !== 0);
    const isActuallyNegative = firstNonZero < 0;

    let processingValue = value;
    if (isActuallyNegative) {
        processingValue = invertBalanced(value, base);
    }

    const procDigits = processingValue.split('').map(d => balancedDigits[base].toStandard[d]);
    let carry = 0;
    const result = [];
    for (let i = procDigits.length - 1; i >= 0; i--) {
        let val = procDigits[i] + carry;
        if (val < 0) { result.unshift(val + base); carry = -1; }
        else { result.unshift(val); carry = 0; }
    }
    while (result.length > 1 && result[0] === 0) result.shift();
    if (result.length === 0) result.push(0);

    let resultStr = result.join('');
    if (isActuallyNegative) resultStr = '-' + resultStr;

    return { value: resultStr, steps };
};

export const standardToBalanced = (value, base) => {
    const steps = [];
    const digits = value.split('').map(Number);
    const result = [];
    let carry = 0;
    for (let i = digits.length - 1; i >= 0; i--) {
        let val = digits[i] + carry;
        let remainder;
        if (val > Math.floor(base / 2)) {
            remainder = val - base;
            carry = 1;
        } else {
            remainder = val;
            carry = 0;
        }
        result.unshift(balancedDigits[base].fromStandard[remainder.toString()]);
    }
    if (carry > 0) result.unshift(balancedDigits[base].fromStandard['1']);
    while (result.length > 1 && result[0] === '0') result.shift();

    return { value: result.join(''), steps };
};

export const convertAdjacentBases = (digits, fromBase, toBase) => {
    if (Math.abs(fromBase - toBase) !== 1) {
        throw new Error(`Adjacent conversion only works for p -> p \u00B1 1. Received ${fromBase} → ${toBase}`);
    }
    const allSteps = [];
    const result_digits = [];
    let current_digits = [...digits];
    const isDecrement = toBase < fromBase;
    const divisor = isDecrement ? fromBase - 1 : fromBase + 1;

    while (current_digits.length > 0 && (current_digits.length > 1 || current_digits[0] !== 0)) {
        const n = current_digits.length - 1;
        const a = [...current_digits].reverse();
        const b = [];
        const c = [];
        c[n + 1] = 0;
        for (let i = n; i >= 0; i--) {
            const ai = a[i];
            let q;
            if (isDecrement) {
                const sum = ai + c[i + 1];
                q = Math.floor(sum / divisor);
                c[i] = sum % divisor;
                b[i] = c[i + 1] + q;
            } else {
                const diff = ai - c[i + 1];
                q = Math.floor(diff / divisor);
                c[i] = diff - (q * divisor);
                b[i] = c[i + 1] + q;
            }
        }
        result_digits.unshift(c[0]);
        b.reverse();
        while (b.length > 1 && b[0] === 0) b.shift();
        if (b.length === 0) b.push(0);
        current_digits = b;
    }
    if (result_digits.length === 0) result_digits.push(0);
    return { result: result_digits, steps: allSteps };
};

export const convertViaNonary = (digits, fromBase, toBase) => {
    const allSteps = [];
    if (fromBase === 10 && toBase === 3) {
        const step1 = convertAdjacentBases(digits, 10, 9);
        const tPairs = [];
        step1.result.forEach(digit => { tPairs.push(Math.floor(digit / 3), digit % 3); });
        while (tPairs.length > 1 && tPairs[0] === 0) tPairs.shift();
        return { result: tPairs, steps: allSteps };
    }
    if (fromBase === 3 && toBase === 10) {
        const d3 = [...digits];
        if (d3.length % 2 !== 0) d3.unshift(0);
        const d9 = [];
        for (let i = 0; i < d3.length; i += 2) d9.push(d3[i] * 3 + d3[i + 1]);
        const step2 = convertAdjacentBases(d9, 9, 10);
        return { result: step2.result, steps: allSteps };
    }
    return { result: [0], steps: [] };
};

export const convertViaPowerMapping = (digits, fromBase, toBase) => {
    if (fromBase === 27 && toBase === 3) {
        const d3 = [];
        digits.forEach(d => {
            const t2 = Math.floor(d / 9); const rem = d % 9;
            const t1 = Math.floor(rem / 3); const t0 = rem % 3;
            d3.push(t2, t1, t0);
        });
        while (d3.length > 1 && d3[0] === 0) d3.shift();
        return { result: d3, steps: [] };
    }
    if (fromBase === 3 && toBase === 27) {
        const d3 = [...digits];
        while (d3.length % 3 !== 0) d3.unshift(0);
        const d27 = [];
        for (let i = 0; i < d3.length; i += 3) d27.push(d3[i] * 9 + d3[i + 1] * 3 + d3[i + 2]);
        return { result: d27, steps: [] };
    }
    if (fromBase === 9 && toBase === 3) {
        const d3 = [];
        digits.forEach(d => { d3.push(Math.floor(d / 3), d % 3); });
        while (d3.length > 1 && d3[0] === 0) d3.shift();
        return { result: d3, steps: [] };
    }
    if (fromBase === 3 && toBase === 9) {
        const d3 = [...digits];
        if (d3.length % 2 !== 0) d3.unshift(0);
        const d9 = [];
        for (let i = 0; i < d3.length; i += 2) d9.push(d3[i] * 3 + d3[i + 1]);
        while (d9.length > 1 && d9[0] === 0) d9.shift();
        return { result: d9, steps: [] };
    }
    return { result: [0], steps: [] };
};

export const convertViaDoubleBridge = (digits, fromBase, toBase) => {
    if (fromBase === 10 && toBase === 2) {
        const step1 = convertAdjacentBases(digits, 10, 9);
        const tDigits = [];
        step1.result.forEach(d => tDigits.push(Math.floor(d / 3), d % 3));
        while (tDigits.length > 1 && tDigits[0] === 0) tDigits.shift();
        const step3 = convertAdjacentBases(tDigits, 3, 2);
        return { result: step3.result, steps: [] };
    }
    if (fromBase === 2 && toBase === 10) {
        const step1 = convertAdjacentBases(digits, 2, 3);
        const d3 = [...step1.result];
        if (d3.length % 2 !== 0) d3.unshift(0);
        const d9 = [];
        for (let i = 0; i < d3.length; i += 2) d9.push(d3[i] * 3 + d3[i + 1]);
        const step3 = convertAdjacentBases(d9, 9, 10);
        return { result: step3.result, steps: [] };
    }
    return { result: [0], steps: [] };
};

export const convertViaTernaryBridge = (digits, fromBase, toBase) => {
    if (fromBase === 9 && toBase === 2) {
        const tDigits = [];
        digits.forEach(d => tDigits.push(Math.floor(d / 3), d % 3));
        while (tDigits.length > 1 && tDigits[0] === 0) tDigits.shift();
        const step2 = convertAdjacentBases(tDigits, 3, 2);
        return { result: step2.result, steps: [] };
    }
    if (fromBase === 2 && toBase === 9) {
        const step1 = convertAdjacentBases(digits, 2, 3);
        const d3 = [...step1.result];
        if (d3.length % 2 !== 0) d3.unshift(0);
        const d9 = [];
        for (let i = 0; i < d3.length; i += 2) d9.push(d3[i] * 3 + d3[i + 1]);
        return { result: d9, steps: [] };
    }
    return { result: [0], steps: [] };
};

export const validateInput = (value, base, isBalanced) => {
    if (!value) return false;
    if (isBalanced) {
        if (base === 3) return /^[+\-0]+$/.test(value);
        if (base === 9) return /^[WXYZ01234]+$/.test(value);
    }
    if (base === 27) return /^-?[0123456789ABCDEFGHKMNPRTVXZ]+$/i.test(value) && value !== '-';
    const allD = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cur = allD.slice(0, base);
    return new RegExp(`^-?[${cur}]+$`, 'i').test(value) && value !== '-';
};

export const analyzeComplexity = (sB, tB) => {
    const diff = Math.abs(tB - sB);
    if (sB === tB) return { time: 'O(1)', space: 'O(1)', descriptionKey: 'descIdentity', efficiencyKey: 'effOptimal' };
    if (diff === 1) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descQuadraticP', efficiencyKey: 'effOptimalQuadratic' };
    if ((sB === 10 && tB === 3) || (sB === 3 && tB === 10)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeNonary', efficiencyKey: 'effOptimal' };
    if ((sB === 10 && tB === 2) || (sB === 2 && tB === 10)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeDouble', efficiencyKey: 'effOptimal' };
    if ((sB === 27 && tB === 3) || (sB === 3 && tB === 27)) return { time: 'O(n)', space: 'O(n)', descriptionKey: 'descPowerMapping3', efficiencyKey: 'effLinear' };
    if ((sB === 9 && tB === 3) || (sB === 3 && tB === 9)) return { time: 'O(n)', space: 'O(n)', descriptionKey: 'descPowerMapping2', efficiencyKey: 'effLinear' };
    if ((sB === 27 && tB === 9) || (sB === 9 && tB === 27)) return { time: 'O(n)', space: 'O(n)', descriptionKey: 'descPowerMappingCompound', efficiencyKey: 'effLinear' };
    if ((sB === 27 && tB === 10)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeHeptaDecimal', efficiencyKey: 'effOptimal' };
    if ((sB === 27 && tB === 2)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeHeptaBinary', efficiencyKey: 'effOptimal' };
    return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descNotImplemented', efficiencyKey: 'effNotImplemented' };
};

export const performFullConversion = (inputValue, sB, tB, sBal, tBal) => {
    if (!validateInput(inputValue, sB, sBal)) throw new Error("Invalid Input");

    let pIn = inputValue;
    let isNeg = false;

    if (!sBal && pIn.startsWith('-')) { isNeg = true; pIn = pIn.slice(1); }
    if (sBal && (sB === 3 || sB === 9)) {
        const balConv = balancedToStandard(inputValue, sB);
        pIn = balConv.value;
        if (pIn.startsWith('-')) { isNeg = true; pIn = pIn.slice(1); }
    }

    const digits = [];
    pIn = pIn.toUpperCase();
    if (pIn.length > 1 && sB !== 27) pIn = pIn.replace(/^0+/, '');
    if (pIn === '') pIn = '0';
    for (let char of pIn) digits.push(getDigitValue(char, sB));

    let conversion;
    const diff = Math.abs(tB - sB);

    if (sB === tB) conversion = { result: digits, steps: [] };
    else if (diff === 1) conversion = convertAdjacentBases(digits, sB, tB);
    else if ((sB === 10 && tB === 3) || (sB === 3 && tB === 10)) conversion = convertViaNonary(digits, sB, tB);
    else if ((sB === 10 && tB === 2) || (sB === 2 && tB === 10)) conversion = convertViaDoubleBridge(digits, sB, tB);
    else if ((sB === 9 && tB === 2) || (sB === 2 && tB === 9)) conversion = convertViaTernaryBridge(digits, sB, tB);
    else if ((sB === 3 && tB === 9) || (sB === 9 && tB === 3)) conversion = convertViaPowerMapping(digits, sB, tB);
    else if ((sB === 27 && tB === 3) || (sB === 3 && tB === 27)) conversion = convertViaPowerMapping(digits, sB, tB);
    else if ((sB === 27 && tB === 9) || (sB === 9 && tB === 27)) {
        if (sB === 27) {
            const s1 = convertViaPowerMapping(digits, 27, 3);
            const d3 = s1.result;
            if (d3.length % 2 !== 0) d3.unshift(0);
            const d9 = [];
            for (let i = 0; i < d3.length; i += 2) d9.push(d3[i] * 3 + d3[i + 1]);
            conversion = { result: d9, steps: [] };
        } else {
            const d3 = [];
            digits.forEach(d => d3.push(Math.floor(d / 3), d % 3));
            conversion = convertViaPowerMapping(d3, 3, 27);
        }
    }
    else if (sB === 27 && tB === 10) {
        const s1 = convertViaPowerMapping(digits, 27, 3);
        conversion = convertViaNonary(s1.result, 3, 10);
    }
    else if (sB === 10 && tB === 27) {
        const s1 = convertViaNonary(digits, 10, 3);
        conversion = convertViaPowerMapping(s1.result, 3, 27);
    }
    else if (sB === 27 && tB === 2) {
        const s1 = convertViaPowerMapping(digits, 27, 3);
        conversion = convertAdjacentBases(s1.result, 3, 2);
    }
    else if (sB === 2 && tB === 27) {
        const s1 = convertAdjacentBases(digits, 2, 3);
        conversion = convertViaPowerMapping(s1.result, 3, 27);
    }
    else throw new Error("Path not implemented");

    let finalStr = formatBaseOutput(conversion.result, tB);
    if (isNeg && !tBal) finalStr = '-' + finalStr;
    if (tBal && (tB === 3 || tB === 9)) {
        const balConv = standardToBalanced(finalStr, tB);
        finalStr = isNeg ? invertBalanced(balConv.value, tB) : balConv.value;
    }
    return finalStr;
};
