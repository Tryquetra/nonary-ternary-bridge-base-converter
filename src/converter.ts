export const HEPT_DIGITS = "0123456789ABCDEFGHKMNPRTVXZ";

export const ternaryToNonaryMap: Record<string, string> = {
    '++': '4', '+0': '3', '+-': '2',
    '0+': '1', '00': '0', '0-': 'Z',
    '-+': 'Y', '-0': 'X', '--': 'W'
};

export const nonaryToTernaryMap: Record<string, string> = {
    '4': '++', '3': '+0', '2': '+-',
    '1': '0+', '0': '00', 'Z': '0-',
    'Y': '-+', 'X': '-0', 'W': '--'
};

export interface BalancedDigitMap {
    toStandard: Record<string, number>;
    fromStandard: Record<string, string>;
}

export const balancedDigits: Record<number, BalancedDigitMap> = {
    3: {
        toStandard: { '-': -1, '0': 0, '+': 1 },
        fromStandard: { '-1': '-', '0': '0', '1': '+' }
    },
    9: {
        toStandard: { 'W': -4, 'X': -3, 'Y': -2, 'Z': -1, '0': 0, '1': 1, '2': 2, '3': 3, '4': 4 },
        fromStandard: { '-4': 'W', '-3': 'X', '-2': 'Y', '-1': 'Z', '0': '0', '1': '1', '2': '2', '3': '3', '4': '4' }
    }
};

export const getDigitValue = (char: string, base: number): number => {
    const c = char.toUpperCase();
    if (base === 27) {
        return HEPT_DIGITS.indexOf(c);
    }
    if (c >= '0' && c <= '9') return parseInt(c);
    return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
};

export const getDigitChar = (val: number, base: number): string => {
    if (base === 27) {
        return HEPT_DIGITS[val] || '?';
    }
    if (val < 10) return val.toString();
    return String.fromCharCode('A'.charCodeAt(0) + val - 10);
};

export const formatBaseOutput = (arr: number[], base: number): string => {
    if (arr.length === 0) return '0';
    let result = arr.map(d => getDigitChar(d, base)).join('');
    // Trim leading zeros but preserve at least one digit
    result = result.replace(/^0+(?=\d|[A-Z])/, '');
    return result === '' ? '0' : result;
};

export type ConversionStep = {
    type: string;
    descriptionKey?: string;
    methodKey?: string;
    args?: Record<string, any>;
    value?: string;
    base?: number;
    balanced?: boolean;
    original?: string;
    converted?: string;
    mappings?: any[];
    mapping?: any[];
    groups?: any[];
    index?: number;
    digit?: number;
    carry?: number;
    formula?: string;
    result?: string;
    message?: string;
    messageKey?: string;
};

export interface ConversionResult {
    result: number[];
    steps: ConversionStep[];
}

export const balancedToStandard = (value: string, base: number, i18n_func: (key: string) => string): { value: string, steps: ConversionStep[] } => {
    const steps: ConversionStep[] = [];
    steps.push({
        type: 'balanced_conversion',
        descriptionKey: 'stepBalancedConversion',
        args: { from: i18n_func('stepBalancedFrom'), to: i18n_func('stepBalancedTo') }
    });

    const config = balancedDigits[base];
    if (!config) return { value, steps };

    const digits = value.split('').map(d => config.toStandard[d] ?? 0);
    let carry = 0;
    const result: number[] = [];
    for (let i = digits.length - 1; i >= 0; i--) {
        let val = (digits[i] ?? 0) + carry;
        if (val < 0) { result.unshift(val + base); carry = -1; }
        else { result.unshift(val); carry = 0; }
    }
    if (carry < 0) result.unshift(base - 1);

    const finalValue = formatBaseOutput(result, base);

    steps.push({
        type: 'balanced_detail',
        original: value,
        converted: finalValue,
        mapping: value.split('').map((d, i) => ({ balanced: d, value: digits[i] }))
    });
    return { value: finalValue, steps };
};

export const standardToBalanced = (value: string, base: number, i18n_func: (key: string) => string): { value: string, steps: ConversionStep[] } => {
    const steps: ConversionStep[] = [];
    steps.push({
        type: 'balanced_conversion',
        descriptionKey: 'stepBalancedConversion',
        args: { from: i18n_func('stepBalancedTo'), to: i18n_func('stepStandardTo') }
    });

    if (base === 3) {
        const digits = value.split('').map(Number);
        const result: string[] = [];
        let carry = 0;
        for (let i = digits.length - 1; i >= 0; i--) {
            let val = (digits[i] ?? 0) + carry;
            if (val === 2) { result.unshift('-'); carry = 1; }
            else if (val === 3) { result.unshift('0'); carry = 1; }
            else if (val === 1) { result.unshift('+'); carry = 0; }
            else { result.unshift('0'); carry = 0; }
        }
        if (carry > 0) result.unshift('+');

        // Trim leading zeros in balanced string
        let finalStr = result.join('').replace(/^0+(?=[+\-])/, '');
        if (finalStr === '') finalStr = '0';

        steps.push({
            type: 'balanced_detail', original: value, converted: finalStr,
            mapping: result.map((d, i) => ({ standard: digits[i], balanced: d }))
        });
        return { value: finalStr, steps };
    } else if (base === 9) {
        const digits = value.split('').map(Number);
        const result: string[] = [];
        let carry = 0;
        for (let i = digits.length - 1; i >= 0; i--) {
            let val = (digits[i] ?? 0) + carry;
            if (val > 4) {
                const balanced = val - 9;
                result.unshift(balancedDigits[9]!.fromStandard[balanced.toString()] || '0');
                carry = 1;
            } else {
                result.unshift(balancedDigits[9]!.fromStandard[val.toString()] || '0');
                carry = 0;
            }
        }
        if (carry > 0) result.unshift('1');

        let finalStr = result.join('').replace(/^0+(?=[WXYZ1234])/, '');
        if (finalStr === '') finalStr = '0';

        steps.push({
            type: 'balanced_detail', original: value, converted: finalStr,
            mapping: result.map((d, i) => ({ standard: digits[i], balanced: d }))
        });
        return { value: finalStr, steps };
    }
    return { value, steps };
};

export const convertAdjacentBases = (digits: number[], fromBase: number, toBase: number): ConversionResult => {
    const allSteps: ConversionStep[] = [];
    const result_digits: number[] = [];
    let current_digits = [...digits];
    const isDecrement = toBase < fromBase;
    const divisor = isDecrement ? fromBase - 1 : fromBase + 1;

    allSteps.push({
        type: 'start',
        descriptionKey: 'stepStartPtoP',
        methodKey: 'stepStartMethod',
        args: {
            from: fromBase,
            to: toBase,
            method: isDecrement ? 'p→p-1' : 'p→p+1',
            divisor: divisor
        }
    });

    let pass = 0;
    while (current_digits.length > 0 && (current_digits.length > 1 || current_digits[0] !== 0)) {
        const n = current_digits.length - 1;
        const a = [...current_digits].reverse();
        const b: number[] = [];
        const c: number[] = [];
        c[n + 1] = 0;
        const passSteps: ConversionStep[] = [];

        for (let i = n; i >= 0; i--) {
            const ai = a[i] ?? 0;
            let q: number, r: number, formulaMsg: string;
            const ci_next = c[i + 1] ?? 0;
            if (isDecrement) {
                const sum = ai + ci_next;
                q = Math.floor(sum / divisor);
                r = sum % divisor;
                b[i] = ci_next + q;
                c[i] = r;
                formulaMsg = `Pass ${pass}: i=${i}, a=${ai}, c_in=${ci_next} | sum=${sum} | q=${q}, r=${r} | b=${b[i]}, c_out=${c[i]}`;
            } else {
                const diff = ai - ci_next;
                q = Math.floor(diff / divisor);
                r = diff - (q * divisor);
                b[i] = ci_next + q;
                c[i] = r;
                formulaMsg = `Pass ${pass}: i=${i}, a=${ai}, c_in=${ci_next} | diff=${diff} | q=${q}, r=${r} | b=${b[i]}, c_out=${c[i]}`;
            }
            passSteps.push({
                type: 'iteration', index: i, digit: ai, carry: ci_next, formula: formulaMsg
            });
        }

        const remainder = c[0] ?? 0;
        result_digits.unshift(remainder);
        b.reverse();
        while (b.length > 1 && b[0] === 0) b.shift();
        if (b.length === 0) b.push(0);
        current_digits = b;
        allSteps.push(...passSteps);

        allSteps.push({
            type: 'intermediate',
            descriptionKey: 'stepIntermediate',
            args: {
                remainder: remainder,
                char: getDigitChar(remainder, toBase),
                quotient: current_digits.join(',')
            },
            value: formatBaseOutput(current_digits, fromBase)
        });
        pass++;
    }
    if (result_digits.length === 0) result_digits.push(0);
    return { result: result_digits, steps: allSteps };
};

export const convertViaNonary = (digits: number[], fromBase: number, toBase: number): ConversionResult => {
    const allSteps: ConversionStep[] = [];
    if (fromBase === 10 && toBase === 3) {
        allSteps.push({ type: 'bridge_start', descriptionKey: 'stepBridgeStart', args: { from: 10, to: 3, path: 'nonária' } });
        const step1 = convertAdjacentBases(digits, 10, 9);
        allSteps.push(...step1.steps);
        allSteps.push({ type: 'intermediate', descriptionKey: 'stepIntermediateResult', args: { base: 9 }, value: formatBaseOutput(step1.result, 9) });

        const ternaryPairs: number[] = [];
        step1.result.forEach(digit => {
            ternaryPairs.push(Math.floor(digit / 3), digit % 3);
        });
        while (ternaryPairs.length > 1 && ternaryPairs[0] === 0) ternaryPairs.shift();

        allSteps.push({ type: 'mapping', descriptionKey: 'stepMappingDesc2', mapping: step1.result.map(d => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
        return { result: ternaryPairs, steps: allSteps };
    }
    if (fromBase === 3 && toBase === 10) {
        allSteps.push({ type: 'bridge_start', descriptionKey: 'stepBridgeStart', args: { from: 3, to: 10, path: 'nonária' } });
        const digits3 = [...digits];
        if (digits3.length % 2 !== 0) digits3.unshift(0);
        const nonaryDigits: number[] = [];
        for (let i = 0; i < digits3.length; i += 2) {
            const d1 = digits3[i] ?? 0;
            const d2 = digits3[i + 1] ?? 0;
            nonaryDigits.push(d1 * 3 + d2);
        }

        allSteps.push({ type: 'grouping', descriptionKey: 'stepGroupingDesc2', groups: nonaryDigits.map((d, i) => ({ from: `${digits3[i * 2]}${digits3[i * 2 + 1]}`, to: d })) });
        allSteps.push({ type: 'intermediate', descriptionKey: 'stepIntermediateResult', args: { base: 9 }, value: formatBaseOutput(nonaryDigits, 9) });
        const step2 = convertAdjacentBases(nonaryDigits, 9, 10);
        allSteps.push(...step2.steps);
        return { result: step2.result, steps: allSteps };
    }
    return { result: [0], steps: [{ type: 'error', messageKey: 'errorNotOptimized', args: { from: fromBase, to: toBase } }] };
};

export const convertViaPowerMapping = (digits: number[], fromBase: number, toBase: number): ConversionResult => {
    const allSteps: ConversionStep[] = [];
    if (fromBase === 27 && toBase === 3) {
        allSteps.push({ type: 'bridge_start', descriptionKey: 'stepBridgeStart', args: { from: 27, to: 3, path: 'Heptavintimal' } });
        const ternaryDigits: number[] = [];
        const mapping: { from: string, to: string }[] = [];
        digits.forEach(d => {
            const t2 = Math.floor(d / 9); const rem = d % 9;
            const t1 = Math.floor(rem / 3); const t0 = rem % 3;
            ternaryDigits.push(t2, t1, t0);
            mapping.push({ from: getDigitChar(d, 27), to: `${t2}${t1}${t0}` });
        });
        while (ternaryDigits.length > 1 && ternaryDigits[0] === 0) ternaryDigits.shift();
        allSteps.push({ type: 'mapping', descriptionKey: 'stepMappingDesc3', mapping: mapping.map(m => ({ nonary: m.from, ternary: m.to })) });
        return { result: ternaryDigits, steps: allSteps };
    }
    if (fromBase === 3 && toBase === 27) {
        allSteps.push({ type: 'bridge_start', descriptionKey: 'stepBridgeStart', args: { from: 3, to: 27, path: 'Heptavintimal' } });
        const digits3 = [...digits];
        while (digits3.length % 3 !== 0) digits3.unshift(0);
        const heptDigits: number[] = [];
        const groups: { from: string, to: string }[] = [];
        for (let i = 0; i < digits3.length; i += 3) {
            const d1 = digits3[i] ?? 0;
            const d2 = digits3[i + 1] ?? 0;
            const d3 = digits3[i + 2] ?? 0;
            const val = d1 * 9 + d2 * 3 + d3;
            heptDigits.push(val);
            groups.push({ from: `${d1}${d2}${d3}`, to: getDigitChar(val, 27) });
        }
        allSteps.push({ type: 'grouping', descriptionKey: 'stepGroupingDesc3', groups: groups });
        return { result: heptDigits, steps: allSteps };
    }
    return { result: [0], steps: [] };
};

export interface ComplexityResult {
    time: string;
    space: string;
    descriptionKey: string;
    efficiencyKey: string;
}

export const analyzeComplexity = (from: number, to: number): ComplexityResult => {
    const diff = Math.abs(to - from);
    if (from === to) return { time: 'O(d)', space: 'O(d)', descriptionKey: 'descIdentity', efficiencyKey: 'effLinear' };
    if ((from === 3 && to === 9) || (from === 9 && to === 3)) return { time: 'O(d)', space: 'O(d)', descriptionKey: 'descPowerMapping2', efficiencyKey: 'effOptimal' };
    if ((from === 3 && to === 27) || (from === 27 && to === 3)) return { time: 'O(d)', space: 'O(d)', descriptionKey: 'descPowerMapping3', efficiencyKey: 'effOptimal' };
    if ((from === 9 && to === 27) || (from === 27 && to === 9)) return { time: 'O(d)', space: 'O(d)', descriptionKey: 'descPowerMappingCompound', efficiencyKey: 'effOptimal' };
    if (diff === 1) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descQuadraticP', efficiencyKey: 'effOptimalQuadratic' };
    if ((from === 10 && to === 3) || (from === 3 && to === 10)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeNonary', efficiencyKey: 'effOptimal' };
    if ((from === 10 && to === 2) || (from === 2 && to === 10)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeDouble', efficiencyKey: 'effOptimal' };
    if ((from === 27 && to === 10) || (from === 10 && to === 27)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeHeptaDecimal', efficiencyKey: 'effOptimal' };
    if ((from === 27 && to === 2) || (from === 2 && to === 27)) return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descBridgeHeptaBinary', efficiencyKey: 'effOptimal' };
    return { time: 'O(n²)', space: 'O(n)', descriptionKey: 'descNotImplemented', efficiencyKey: 'effNotImplemented' };
};

export const validateInput = (value: string, base: number, isBalanced: boolean): boolean => {
    if (!value) return false;
    if (isBalanced) {
        if (base === 3) return /^[+\-0]+$/.test(value);
        if (base === 9) return /^[WXYZ01234]+$/.test(value);
    }
    if (base === 27) return new RegExp(`^[${HEPT_DIGITS}]+$`, 'i').test(value);
    const validDigits = '0123456789ABCDEF'.slice(0, base);
    return new RegExp(`^[${validDigits}]+$`, 'i').test(value);
};
