// src/translations.ts
var translations = {
  en: {
    pageTitle: "Nonary Arithmetic - Advanced Base Converter (Base 3, 9, 27 & Balanced)",
    mainTitle: "Nonary Arithmetic",
    subTitle: "p→p±1 Algorithm and Power Mappings (Base 3, 9, 27)",
    configTitle: "Configuration",
    inputLabel: "Input Number",
    inputPlaceholder: "Enter a number",
    heptavintimalHelp: "Heptavintimal (Jones): 0-9, A-Z (except I, J, L, O, Q, S, U, W, Y)",
    sourceBaseLabel: "Source Base",
    targetBaseLabel: "Target Base",
    useBalancedLabel: "Use balanced form",
    convertButton: "Convert",
    balancedTernaryHelp: "Balanced Ternary: - = -1, 0 = 0, + = +1",
    symmetricNonaryHelp: "Symmetric Nonary: W=-4, X=-3, Y=-2, Z=-1, 0-4",
    complexityTitle: "Complexity Analysis",
    quickResultTitle: "Result",
    stepsTitle: "Conversion Steps",
    optimizedCasesTitle: "Optimized Special Cases",
    caseAdjacentTitle: "Adjacent Bases (p↔p±1)",
    caseAdjacentDesc: "O(n²) Algorithm - Synthetic division",
    caseNonaryBridgeTitle: "Nonary Bridge (10↔3)",
    caseNonaryBridgeDesc: "O(n²) path (via O(n²) + O(d))",
    caseDoubleBridgeTitle: "Double Bridge (10↔2)",
    caseDoubleBridgeDesc: "O(n²) path (via bridges 9 and 3)",
    caseTernaryBridgeTitle: "Ternary Bridge (9↔2)",
    caseTernaryBridgeDesc: "O(n²) path (via O(d) + O(n²))",
    casePowersTitle: "Powers (9↔3, 27↔3)",
    casePowersDesc: "O(d) mapping (linear per digit). Base 27 (Heptavintimal) uses Jones' alphabet.",
    caseBalancedTitle: "Balanced Representations",
    caseBalancedDesc: "O(d) conversion (linear per digit)",
    caseHeptaNonaryTitle: "Hepta-Nonary Bridge (27↔9)",
    caseHeptaNonaryDesc: "O(d) mapping (via O(d) + O(d))",
    caseHeptaDecimalTitle: "Hepta-Decimal Bridge (27↔10)",
    caseHeptaDecimalDesc: "O(n²) path",
    caseHeptaBinaryTitle: "Hepta-Binary Bridge (27↔2)",
    caseHeptaBinaryDesc: "O(n²) path",
    specialSystemsTitle: "Special Number Systems",
    balancedTernaryTitle: "Balanced Ternary (Base 3)",
    balancedTernaryExample: "Example: +0- = (+1)×3² + 0×3¹ + (-1)×3⁰ = 9 - 1 = 8₁₀",
    symmetricNonaryTitle: "Symmetric Nonary (Base 9)",
    symmetricNonaryDesc: "Direct mapping (2 balanced trits) to Balanced Base 3.",
    heptavintimalTitle: "Heptavintimal (Base 27)",
    heptavintimalAlphabet: "Jones' Alphabet",
    heptavintimalDesc: "Efficient packing for 3 trits (3³ = 27). Avoids ambiguous letters (I, J, L, O, Q, S, U, W, Y).",
    descIdentity: "Identity (No-op)",
    descPowerMapping2: "Power Mapping (9=3²)",
    descPowerMapping3: "Power Mapping (27=3³) - Heptavintimal",
    descPowerMappingCompound: "Compound Mapping via Base 3 (9↔3↔27)",
    descQuadraticP: "Quadratic - p→p±1 Algorithm",
    descBridgeNonary: "Nonary Bridge (10↔9↔3)",
    descBridgeDouble: "Double Bridge (10↔9↔3↔2)",
    descBridgeHeptaDecimal: "Via Nonary Bridge (27↔3↔9↔10)",
    descBridgeHeptaBinary: "Via Ternary Bridge (27↔3↔2)",
    descNotImplemented: "Non-optimized path",
    effLinear: "Linear",
    effOptimal: "Optimal",
    effOptimalQuadratic: "Optimal (O(n²))",
    effNotImplemented: "Not Implemented",
    stepInput: "Input:",
    stepResult: "Result:",
    stepBase: "Base",
    stepBalanced: "(Balanced)",
    stepBalancedConversion: "Converting from {from} to {to}",
    stepBalancedFrom: "balanced",
    stepBalancedTo: "standard",
    stepStandardTo: "balanced",
    stepOriginal: "Original:",
    stepConverted: "Converted:",
    stepBridgeStart: "Conversion {from}→{to} via {path} bridge",
    stepStartPtoP: "p→p±1 Algorithm: Base {from} to {to}",
    stepStartMethod: "{method} (Synthetic division by {divisor})",
    stepIntermediate: "Remainder {remainder} ({char}). Quotient: [ {quotient} ]",
    stepIntermediateResult: "Intermediate Result (Base {base})",
    stepMapping: "Mapping {from}→{to}",
    stepGrouping: "Grouping {from}→{to}",
    stepMappingDesc2: "Mapping 9→3 (each base-9 digit = 2 trits)",
    stepMappingDesc3: "Mapping 27→3 (each base-27 digit = 3 trits)",
    stepGroupingDesc2: "Grouping 3→9 (pairs of trits → base-9 digit)",
    stepGroupingDesc3: "Grouping 3→27 (triplets of trits → base-27 digit)",
    errorInvalidInput: "Invalid input. Valid characters: {chars}",
    errorIllegalDigit: "Illegal digit: {char}",
    errorNotOptimized: "Non-optimized path for {from} → {to}.",
    swapLabel: "Swap Bases",
    copyTooltip: "Copy to clipboard",
    copiedTooltip: "Copied!",
    validationError: "Invalid characters for Base {base}"
  },
  pt: {
    pageTitle: "Aritmética Nonária - Conversor Avançado (Base 3, 9, 27 & Balanceada)",
    mainTitle: "Aritmética Nonária",
    subTitle: "Algoritmo p→p±1 e Mapeamentos de Potência (Base 3, 9, 27)",
    configTitle: "Configuração",
    inputLabel: "Número de Entrada",
    inputPlaceholder: "Digite um número",
    heptavintimalHelp: "Heptavintimal (Jones): 0-9, A-Z (exceto I, J, L, O, Q, S, U, W, Y)",
    sourceBaseLabel: "Base de Origem",
    targetBaseLabel: "Base de Destino",
    useBalancedLabel: "Usar forma balanceada",
    convertButton: "Converter",
    balancedTernaryHelp: "Ternário balanceado: - = -1, 0 = 0, + = +1",
    symmetricNonaryHelp: "Nonário simétrico: W=-4, X=-3, Y=-2, Z=-1, 0-4",
    complexityTitle: "Análise de Complexidade",
    quickResultTitle: "Resultado",
    stepsTitle: "Passos da Conversão",
    optimizedCasesTitle: "Casos Especiais Otimizados",
    caseAdjacentTitle: "Bases Adjacentes (p↔p±1)",
    caseAdjacentDesc: "Algoritmo O(n²) - Divisão sintética",
    caseNonaryBridgeTitle: "Ponte Nonária (10↔3)",
    caseNonaryBridgeDesc: "Caminho O(n²) (via O(n²) + O(d))",
    caseDoubleBridgeTitle: "Ponte Dupla (10↔2)",
    caseDoubleBridgeDesc: "Caminho O(n²) (via pontes 9 e 3)",
    caseTernaryBridgeTitle: "Ponte Ternária (9↔2)",
    caseTernaryBridgeDesc: "Caminho O(n²) (via O(d) + O(n²))",
    casePowersTitle: "Potências (9↔3, 27↔3)",
    casePowersDesc: "Mapeamento O(d) (linear por dígito). Base 27 (Heptavintimal) usa alfabeto de Jones.",
    caseBalancedTitle: "Representações Balanceadas",
    caseBalancedDesc: "Conversão O(d) (linear por dígito)",
    caseHeptaNonaryTitle: "Ponte Hepta-Nonário (27↔9)",
    caseHeptaNonaryDesc: "Mapeamento O(d) (via O(d) + O(d))",
    caseHeptaDecimalTitle: "Ponte Hepta-Decimal (27↔10)",
    caseHeptaDecimalDesc: "Caminho O(n²)",
    caseHeptaBinaryTitle: "Ponte Hepta-Binário (27↔2)",
    caseHeptaBinaryDesc: "Caminho O(n²)",
    specialSystemsTitle: "Sistemas Numéricos Especiais",
    balancedTernaryTitle: "Ternário Balanceado (Base 3)",
    balancedTernaryExample: "Exemplo: +0- = (+1)×3² + 0×3¹ + (-1)×3⁰ = 9 - 1 = 8₁₀",
    symmetricNonaryTitle: "Nonário Simétrico (Base 9)",
    symmetricNonaryDesc: "Mapeamento direto (2 trits balanceados) para Base 3 Balanceada.",
    heptavintimalTitle: "Heptavintimal (Base 27)",
    heptavintimalAlphabet: "Alfabeto de Jones",
    heptavintimalDesc: "Compactação eficiente para 3 trits (3³ = 27). Evita letras ambíguas (I, J, L, O, Q, S, U, W, Y).",
    descIdentity: "Identidade (Não-operacional)",
    descPowerMapping2: "Mapeamento Potência (9=3²)",
    descPowerMapping3: "Mapeamento Potência (27=3³) - Heptavintimal",
    descPowerMappingCompound: "Mapeamento Composto via Base 3 (9↔3↔27)",
    descQuadraticP: "Quadrático - Algoritmo p→p±1",
    descBridgeNonary: "Ponte nonária (10↔9↔3)",
    descBridgeDouble: "Ponte dupla (10↔9↔3↔2)",
    descBridgeHeptaDecimal: "Via Ponte Nonária (27↔3↔9↔10)",
    descBridgeHeptaBinary: "Via Ponte Ternária (27↔3↔2)",
    descNotImplemented: "Caminho não otimizado",
    effLinear: "Linear",
    effOptimal: "Ótima",
    effOptimalQuadratic: "Ótima (O(n²))",
    effNotImplemented: "Não Implementada",
    stepInput: "Entrada:",
    stepResult: "Resultado:",
    stepBase: "Base",
    stepBalanced: "(Balanceada)",
    stepBalancedConversion: "Convertendo de {from} para {to}",
    stepBalancedFrom: "balanceada",
    stepBalancedTo: "padrão",
    stepStandardTo: "balanceada",
    stepOriginal: "Original:",
    stepConverted: "Convertido:",
    stepBridgeStart: "Conversão {from}→{to} via ponte {path}",
    stepStartPtoP: "Algoritmo p→p±1: Base {from} para {to}",
    stepStartMethod: "{method} (Divisão sintética por {divisor})",
    stepIntermediate: "Resto {remainder} ({char}). Quociente: [ {quotient} ]",
    stepIntermediateResult: "Resultado Intermediário (Base {base})",
    stepMapping: "Mapeamento {from}→{to}",
    stepGrouping: "Agrupamento {from}→{to}",
    stepMappingDesc2: "Mapeamento 9→3 (cada dígito base-9 = 2 trits)",
    stepMappingDesc3: "Mapeamento 27→3 (cada dígito base-27 = 3 trits)",
    stepGroupingDesc2: "Agrupamento 3→9 (pares de trits → dígito base-9)",
    stepGroupingDesc3: "Agrupamento 3→27 (trios de trits → dígito base-27)",
    errorInvalidInput: "Entrada inválida. Caracteres válidos: {chars}",
    errorIllegalDigit: "Dígito ilegal: {char}",
    errorNotOptimized: "Caminho não otimizado para {from} → {to}.",
    swapLabel: "Trocar Bases",
    copyTooltip: "Copiar para área de transferência",
    copiedTooltip: "Copiado!",
    validationError: "Caracteres inválidos para Base {base}"
  }
};

// src/converter.ts
var HEPT_DIGITS = "0123456789ABCDEFGHKMNPRTVXZ";
var balancedDigits = {
  3: {
    toStandard: { "-": -1, "0": 0, "+": 1 },
    fromStandard: { "-1": "-", "0": "0", "1": "+" }
  },
  9: {
    toStandard: { W: -4, X: -3, Y: -2, Z: -1, "0": 0, "1": 1, "2": 2, "3": 3, "4": 4 },
    fromStandard: { "-4": "W", "-3": "X", "-2": "Y", "-1": "Z", "0": "0", "1": "1", "2": "2", "3": "3", "4": "4" }
  }
};
var getDigitValue = (char, base) => {
  const c = char.toUpperCase();
  if (base === 27) {
    return HEPT_DIGITS.indexOf(c);
  }
  if (c >= "0" && c <= "9")
    return parseInt(c);
  return c.charCodeAt(0) - 65 + 10;
};
var getDigitChar = (val, base) => {
  if (base === 27) {
    return HEPT_DIGITS[val] || "?";
  }
  if (val < 10)
    return val.toString();
  return String.fromCharCode(65 + val - 10);
};
var formatBaseOutput = (arr, base) => {
  if (arr.length === 0)
    return "0";
  let result = arr.map((d) => getDigitChar(d, base)).join("");
  result = result.replace(/^0+(?=\d|[A-Z])/, "");
  return result === "" ? "0" : result;
};
var invertBalanced = (value, base) => {
  if (base === 3) {
    return value.split("").map((c) => {
      if (c === "+")
        return "-";
      if (c === "-")
        return "+";
      return c;
    }).join("");
  }
  if (base === 9) {
    const invMap = {
      "4": "W",
      "3": "X",
      "2": "Y",
      "1": "Z",
      "0": "0",
      Z: "1",
      Y: "2",
      X: "3",
      W: "4"
    };
    return value.split("").map((c) => invMap[c] || c).join("");
  }
  return value;
};
var balancedToStandard = (value, base, i18n_func) => {
  const steps = [];
  steps.push({
    type: "balanced_conversion",
    descriptionKey: "stepBalancedConversion",
    args: { from: i18n_func("stepBalancedFrom"), to: i18n_func("stepBalancedTo") }
  });
  const config = balancedDigits[base];
  if (!config)
    return { value, steps };
  const digits = value.split("").map((d) => {
    const val = config.toStandard[d];
    if (val === undefined)
      throw new Error(`Invalid balanced digit: ${d}`);
    return val;
  });
  let carry = 0;
  const result = [];
  for (let i = digits.length - 1;i >= 0; i--) {
    let val = (digits[i] ?? 0) + carry;
    if (val < 0) {
      result.unshift(val + base);
      carry = -1;
    } else {
      result.unshift(val);
      carry = 0;
    }
  }
  if (carry < 0)
    result.unshift(base - 1);
  const finalValue = formatBaseOutput(result, base);
  steps.push({
    type: "balanced_detail",
    original: value,
    converted: finalValue,
    mapping: value.split("").map((d, i) => ({ balanced: d, value: digits[i] }))
  });
  return { value: finalValue, steps };
};
var standardToBalanced = (value, base, i18n_func) => {
  const steps = [];
  steps.push({
    type: "balanced_conversion",
    descriptionKey: "stepBalancedConversion",
    args: { from: i18n_func("stepBalancedTo"), to: i18n_func("stepStandardTo") }
  });
  if (base === 3) {
    const digits = value.split("").map(Number);
    const result = [];
    let carry = 0;
    for (let i = digits.length - 1;i >= 0; i--) {
      let val = (digits[i] ?? 0) + carry;
      if (val === 2) {
        result.unshift("-");
        carry = 1;
      } else if (val === 3) {
        result.unshift("0");
        carry = 1;
      } else if (val === 1) {
        result.unshift("+");
        carry = 0;
      } else {
        result.unshift("0");
        carry = 0;
      }
    }
    if (carry > 0)
      result.unshift("+");
    let finalStr = result.join("").replace(/^0+/, "");
    if (finalStr === "")
      finalStr = "0";
    steps.push({
      type: "balanced_detail",
      original: value,
      converted: finalStr,
      mapping: result.map((d, i) => ({ standard: digits[i], balanced: d }))
    });
    return { value: finalStr, steps };
  } else if (base === 9) {
    const digits = value.split("").map(Number);
    const result = [];
    let carry = 0;
    for (let i = digits.length - 1;i >= 0; i--) {
      let val = (digits[i] ?? 0) + carry;
      if (val > 4) {
        const balanced = val - 9;
        result.unshift(balancedDigits[9].fromStandard[balanced.toString()] || "0");
        carry = 1;
      } else {
        result.unshift(balancedDigits[9].fromStandard[val.toString()] || "0");
        carry = 0;
      }
    }
    if (carry > 0)
      result.unshift("1");
    let finalStr = result.join("").replace(/^0+/, "");
    if (finalStr === "")
      finalStr = "0";
    steps.push({
      type: "balanced_detail",
      original: value,
      converted: finalStr,
      mapping: result.map((d, i) => ({ standard: digits[i], balanced: d }))
    });
    return { value: finalStr, steps };
  }
  return { value, steps };
};
var convertAdjacentBases = (digits, fromBase, toBase) => {
  const allSteps = [];
  const result_digits = [];
  let current_digits = [...digits];
  const isDecrement = toBase < fromBase;
  const divisor = isDecrement ? fromBase - 1 : fromBase + 1;
  allSteps.push({
    type: "start",
    descriptionKey: "stepStartPtoP",
    methodKey: "stepStartMethod",
    args: {
      from: fromBase,
      to: toBase,
      method: isDecrement ? "p→p-1" : "p→p+1",
      divisor
    }
  });
  let pass = 0;
  while (current_digits.length > 0 && (current_digits.length > 1 || current_digits[0] !== 0)) {
    const n = current_digits.length - 1;
    const a = [...current_digits].reverse();
    const b = [];
    const c = [];
    c[n + 1] = 0;
    const passSteps = [];
    for (let i = n;i >= 0; i--) {
      const ai = a[i] ?? 0;
      let q, r, formulaMsg;
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
        r = diff - q * divisor;
        b[i] = ci_next + q;
        c[i] = r;
        formulaMsg = `Pass ${pass}: i=${i}, a=${ai}, c_in=${ci_next} | diff=${diff} | q=${q}, r=${r} | b=${b[i]}, c_out=${c[i]}`;
      }
      passSteps.push({
        type: "iteration",
        index: i,
        digit: ai,
        carry: ci_next,
        formula: formulaMsg
      });
    }
    const remainder = c[0] ?? 0;
    result_digits.unshift(remainder);
    b.reverse();
    while (b.length > 1 && b[0] === 0)
      b.shift();
    if (b.length === 0)
      b.push(0);
    current_digits = b;
    allSteps.push(...passSteps);
    allSteps.push({
      type: "intermediate",
      descriptionKey: "stepIntermediate",
      args: {
        remainder,
        char: getDigitChar(remainder, toBase),
        quotient: current_digits.join(",")
      },
      value: formatBaseOutput(current_digits, fromBase)
    });
    pass++;
  }
  if (result_digits.length === 0)
    result_digits.push(0);
  return { result: result_digits, steps: allSteps };
};
var convertViaNonary = (digits, fromBase, toBase) => {
  const allSteps = [];
  if (fromBase === 10 && toBase === 3) {
    allSteps.push({ type: "bridge_start", descriptionKey: "stepBridgeStart", args: { from: 10, to: 3, path: "nonária" } });
    const step1 = convertAdjacentBases(digits, 10, 9);
    allSteps.push(...step1.steps);
    allSteps.push({ type: "intermediate", descriptionKey: "stepIntermediateResult", args: { base: 9 }, value: formatBaseOutput(step1.result, 9) });
    const ternaryPairs = [];
    step1.result.forEach((digit) => {
      ternaryPairs.push(Math.floor(digit / 3), digit % 3);
    });
    while (ternaryPairs.length > 1 && ternaryPairs[0] === 0)
      ternaryPairs.shift();
    allSteps.push({ type: "mapping", descriptionKey: "stepMappingDesc2", mapping: step1.result.map((d) => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
    return { result: ternaryPairs, steps: allSteps };
  }
  if (fromBase === 3 && toBase === 10) {
    allSteps.push({ type: "bridge_start", descriptionKey: "stepBridgeStart", args: { from: 3, to: 10, path: "nonária" } });
    const digits3 = [...digits];
    if (digits3.length % 2 !== 0)
      digits3.unshift(0);
    const nonaryDigits = [];
    for (let i = 0;i < digits3.length; i += 2) {
      const d1 = digits3[i] ?? 0;
      const d2 = digits3[i + 1] ?? 0;
      nonaryDigits.push(d1 * 3 + d2);
    }
    allSteps.push({ type: "grouping", descriptionKey: "stepGroupingDesc2", groups: nonaryDigits.map((d, i) => ({ from: `${digits3[i * 2]}${digits3[i * 2 + 1]}`, to: d })) });
    allSteps.push({ type: "intermediate", descriptionKey: "stepIntermediateResult", args: { base: 9 }, value: formatBaseOutput(nonaryDigits, 9) });
    const step2 = convertAdjacentBases(nonaryDigits, 9, 10);
    allSteps.push(...step2.steps);
    return { result: step2.result, steps: allSteps };
  }
  return { result: [0], steps: [{ type: "error", messageKey: "errorNotOptimized", args: { from: fromBase, to: toBase } }] };
};
var convertViaPowerMapping = (digits, fromBase, toBase) => {
  const allSteps = [];
  if (fromBase === 27 && toBase === 3) {
    allSteps.push({ type: "bridge_start", descriptionKey: "stepBridgeStart", args: { from: 27, to: 3, path: "Heptavintimal" } });
    const ternaryDigits = [];
    const mapping = [];
    digits.forEach((d) => {
      const t2 = Math.floor(d / 9);
      const rem = d % 9;
      const t1 = Math.floor(rem / 3);
      const t0 = rem % 3;
      ternaryDigits.push(t2, t1, t0);
      mapping.push({ from: getDigitChar(d, 27), to: `${t2}${t1}${t0}` });
    });
    while (ternaryDigits.length > 1 && ternaryDigits[0] === 0)
      ternaryDigits.shift();
    allSteps.push({ type: "mapping", descriptionKey: "stepMappingDesc3", mapping: mapping.map((m) => ({ nonary: m.from, ternary: m.to })) });
    return { result: ternaryDigits, steps: allSteps };
  }
  if (fromBase === 3 && toBase === 27) {
    allSteps.push({ type: "bridge_start", descriptionKey: "stepBridgeStart", args: { from: 3, to: 27, path: "Heptavintimal" } });
    const digits3 = [...digits];
    while (digits3.length % 3 !== 0)
      digits3.unshift(0);
    const heptDigits = [];
    const groups = [];
    for (let i = 0;i < digits3.length; i += 3) {
      const d1 = digits3[i] ?? 0;
      const d2 = digits3[i + 1] ?? 0;
      const d3 = digits3[i + 2] ?? 0;
      const val = d1 * 9 + d2 * 3 + d3;
      heptDigits.push(val);
      groups.push({ from: `${d1}${d2}${d3}`, to: getDigitChar(val, 27) });
    }
    allSteps.push({ type: "grouping", descriptionKey: "stepGroupingDesc3", groups });
    return { result: heptDigits, steps: allSteps };
  }
  return { result: [0], steps: [] };
};
var analyzeComplexity = (from, to) => {
  const diff = Math.abs(to - from);
  if (from === to)
    return { time: "O(d)", space: "O(d)", descriptionKey: "descIdentity", efficiencyKey: "effLinear" };
  if (from === 3 && to === 9 || from === 9 && to === 3)
    return { time: "O(d)", space: "O(d)", descriptionKey: "descPowerMapping2", efficiencyKey: "effOptimal" };
  if (from === 3 && to === 27 || from === 27 && to === 3)
    return { time: "O(d)", space: "O(d)", descriptionKey: "descPowerMapping3", efficiencyKey: "effOptimal" };
  if (from === 9 && to === 27 || from === 27 && to === 9)
    return { time: "O(d)", space: "O(d)", descriptionKey: "descPowerMappingCompound", efficiencyKey: "effOptimal" };
  if (diff === 1)
    return { time: "O(n²)", space: "O(n)", descriptionKey: "descQuadraticP", efficiencyKey: "effOptimalQuadratic" };
  if (from === 10 && to === 3 || from === 3 && to === 10)
    return { time: "O(n²)", space: "O(n)", descriptionKey: "descBridgeNonary", efficiencyKey: "effOptimal" };
  if (from === 10 && to === 2 || from === 2 && to === 10)
    return { time: "O(n²)", space: "O(n)", descriptionKey: "descBridgeDouble", efficiencyKey: "effOptimal" };
  if (from === 27 && to === 10 || from === 10 && to === 27)
    return { time: "O(n²)", space: "O(n)", descriptionKey: "descBridgeHeptaDecimal", efficiencyKey: "effOptimal" };
  if (from === 27 && to === 2 || from === 2 && to === 27)
    return { time: "O(n²)", space: "O(n)", descriptionKey: "descBridgeHeptaBinary", efficiencyKey: "effOptimal" };
  return { time: "O(n²)", space: "O(n)", descriptionKey: "descNotImplemented", efficiencyKey: "effNotImplemented" };
};
var validateInput = (value, base, isBalanced) => {
  if (!value)
    return false;
  if (isBalanced) {
    if (base === 3)
      return /^[+\-0]+$/.test(value);
    if (base === 9)
      return /^[WXYZ01234]+$/.test(value);
  }
  const escapedValue = value.replace(/^-/, "");
  if (base === 27)
    return new RegExp(`^[${HEPT_DIGITS}]+$`, "i").test(escapedValue) && new RegExp(`^\\-?[${HEPT_DIGITS}]+$`, "i").test(value);
  const validDigits = "0123456789ABCDEF".slice(0, base);
  return new RegExp(`^\\-?[${validDigits}]+$`, "i").test(value);
};

// src/app.ts
document.addEventListener("DOMContentLoaded", () => {
  let state = {
    inputValue: "1234",
    sourceBase: 10,
    targetBase: 3,
    sourceBalanced: false,
    targetBalanced: false,
    conversionSteps: [],
    complexity: null,
    currentLang: "en"
  };
  const dom = {
    langSelector: document.getElementById("langSelector"),
    inputValue: document.getElementById("inputValue"),
    sourceBase: document.getElementById("sourceBase"),
    targetBase: document.getElementById("targetBase"),
    sourceBalanced: document.getElementById("sourceBalanced"),
    targetBalanced: document.getElementById("targetBalanced"),
    sourceBalancedWrapper: document.getElementById("sourceBalancedWrapper"),
    targetBalancedWrapper: document.getElementById("targetBalancedWrapper"),
    sourceBalancedHelp: document.getElementById("sourceBalancedHelp"),
    heptavintimalHelp: document.getElementById("heptavintimalHelp"),
    swapButton: document.getElementById("swapButton"),
    convertButton: document.getElementById("convertButton"),
    complexityBox: document.getElementById("complexityBox"),
    quickResultBox: document.getElementById("quickResultBox"),
    stepsContainerWrapper: document.getElementById("stepsContainerWrapper"),
    stepsContainer: document.getElementById("stepsContainer")
  };
  const i18n = (key, args = {}) => {
    const langData = translations[state.currentLang];
    let text = langData[key] || key;
    for (const argKey in args) {
      text = text.replace(`{${argKey}}`, args[argKey]);
    }
    return text;
  };
  const setLang = (lang) => {
    const selectedLang = lang === "pt" ? "pt" : "en";
    state.currentLang = selectedLang;
    document.documentElement.lang = selectedLang;
    dom.langSelector.value = selectedLang;
    document.querySelectorAll("[data-i18n-key]").forEach((el) => {
      const htmlEl = el;
      const key = htmlEl.dataset.i18nKey;
      if (!key)
        return;
      const translation = i18n(key);
      if (htmlEl.tagName === "INPUT" && htmlEl.type === "text") {
        htmlEl.placeholder = translation;
      } else {
        htmlEl.innerHTML = translation;
      }
    });
    updateBalancedUI();
    renderAll();
    if (window.lucide)
      window.lucide.createIcons();
  };
  const getInitialLang = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get("lang");
    return lang === "pt" ? "pt" : "en";
  };
  const performConversion = () => {
    try {
      const { sourceBase: sB, targetBase: tB } = state;
      const { sourceBalanced: sBal, targetBalanced: tBal } = state;
      const getValidChars = () => {
        if (sBal) {
          return sB === 3 ? "{-, 0, +}" : "{W, X, Y, Z, 0, 1, 2, 3, 4}";
        }
        return sB === 27 ? `Alfabeto Jones: ${HEPT_DIGITS}` : sB <= 10 ? `{0-${sB - 1}}` : `{0-9, A-${getDigitChar(sB - 1, sB)}}`;
      };
      if (sB === tB && sBal === tBal) {
        if (!validateInput(state.inputValue, sB, sBal)) {
          state.conversionSteps = [{ type: "error", messageKey: "errorInvalidInput", args: { chars: getValidChars() } }];
          renderAll();
          return;
        }
        state.complexity = analyzeComplexity(sB, tB);
        state.conversionSteps = [{ type: "result", value: state.inputValue, base: tB, balanced: tBal }];
        renderAll();
        return;
      }
      if (!validateInput(state.inputValue, sB, sBal)) {
        state.conversionSteps = [{ type: "error", messageKey: "errorInvalidInput", args: { chars: getValidChars() } }];
        renderAll();
        return;
      }
      let inputSign = 1;
      let processedInput = state.inputValue;
      let wasBalancedNegative = false;
      if (sBal) {
        for (const char of processedInput) {
          if (char === "0")
            continue;
          if (sB === 3) {
            if (char === "-") {
              inputSign = -1;
              wasBalancedNegative = true;
            }
            break;
          } else if (sB === 9) {
            if (["W", "X", "Y", "Z"].includes(char.toUpperCase())) {
              inputSign = -1;
              wasBalancedNegative = true;
            }
            break;
          }
        }
        if (inputSign === -1) {
          processedInput = invertBalanced(processedInput, sB);
        }
      } else {
        if (processedInput.startsWith("-")) {
          inputSign = -1;
          processedInput = processedInput.substring(1);
        }
      }
      const allSteps = [];
      if (sBal && (sB === 3 || sB === 9)) {
        const balConv = balancedToStandard(processedInput, sB, i18n);
        allSteps.push(...balConv.steps);
        processedInput = balConv.value;
      }
      const digits = [];
      processedInput = processedInput.toUpperCase();
      if (processedInput.length > 1 && sB !== 27) {
        processedInput = processedInput.replace(/^0+(?=\d|[A-Z])/, "");
      }
      if (processedInput === "")
        processedInput = "0";
      for (let char of processedInput) {
        const val = getDigitValue(char, sB);
        if (isNaN(val) || val === -1 || val >= sB) {
          throw new Error(i18n("errorIllegalDigit", { char }));
        }
        digits.push(val);
      }
      state.complexity = analyzeComplexity(sB, tB);
      let conversion;
      const diff = Math.abs(tB - sB);
      if (diff === 1) {
        conversion = convertAdjacentBases(digits, sB, tB);
      } else if (sB === 10 && tB === 3 || sB === 3 && tB === 10) {
        conversion = convertViaNonary(digits, sB, tB);
      } else if (sB === 10 && tB === 2 || sB === 2 && tB === 10) {
        allSteps.push({ type: "bridge_start", descriptionKey: "stepBridgeStart", args: { from: 10, to: 2, path: "dupla" } });
        if (sB === 10) {
          const step1 = convertAdjacentBases(digits, 10, 9);
          allSteps.push(...step1.steps);
          allSteps.push({ type: "intermediate", descriptionKey: "stepIntermediateResult", args: { base: 9 }, value: formatBaseOutput(step1.result, 9) });
          const tDigits = [];
          step1.result.forEach((d) => tDigits.push(Math.floor(d / 3), d % 3));
          while (tDigits.length > 1 && tDigits[0] === 0)
            tDigits.shift();
          allSteps.push({ type: "mapping", descriptionKey: "stepMappingDesc2", mapping: step1.result.map((d) => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
          conversion = convertAdjacentBases(tDigits, 3, 2);
        } else {
          const step1 = convertAdjacentBases(digits, 2, 3);
          allSteps.push(...step1.steps);
          const d3 = [...step1.result];
          if (d3.length % 2 !== 0)
            d3.unshift(0);
          const nDigits = [];
          for (let i = 0;i < d3.length; i += 2)
            nDigits.push((d3[i] ?? 0) * 3 + (d3[i + 1] ?? 0));
          allSteps.push({ type: "grouping", descriptionKey: "stepGroupingDesc2", groups: nDigits.map((d, i) => ({ from: `${d3[i * 2]}${d3[i * 2 + 1]}`, to: d })) });
          conversion = convertAdjacentBases(nDigits, 9, 10);
        }
      } else if (sB === 9 && tB === 2 || sB === 2 && tB === 9) {
        allSteps.push({ type: "bridge_start", descriptionKey: "stepBridgeStart", args: { from: sB, to: tB, path: "ternária" } });
        if (sB === 9) {
          const tDigits = [];
          digits.forEach((d) => tDigits.push(Math.floor(d / 3), d % 3));
          while (tDigits.length > 1 && tDigits[0] === 0)
            tDigits.shift();
          allSteps.push({ type: "mapping", descriptionKey: "stepMappingDesc2", mapping: digits.map((d) => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
          conversion = convertAdjacentBases(tDigits, 3, 2);
        } else {
          const step1 = convertAdjacentBases(digits, 2, 3);
          allSteps.push(...step1.steps);
          const d3 = [...step1.result];
          if (d3.length % 2 !== 0)
            d3.unshift(0);
          const nDigits = [];
          for (let i = 0;i < d3.length; i += 2)
            nDigits.push((d3[i] ?? 0) * 3 + (d3[i + 1] ?? 0));
          allSteps.push({ type: "grouping", descriptionKey: "stepGroupingDesc2", groups: nDigits.map((d, i) => ({ from: `${d3[i * 2]}${d3[i * 2 + 1]}`, to: d })) });
          conversion = { result: nDigits, steps: [] };
        }
      } else if (sB === 27 && tB === 3 || sB === 3 && tB === 27) {
        conversion = convertViaPowerMapping(digits, sB, tB);
      } else if (sB === 27 && tB === 9 || sB === 9 && tB === 27) {
        if (sB === 27) {
          const step1 = convertViaPowerMapping(digits, 27, 3);
          allSteps.push(...step1.steps);
          const digits3 = step1.result;
          if (digits3.length % 2 !== 0)
            digits3.unshift(0);
          const digits9 = [];
          const groups = [];
          for (let i = 0;i < digits3.length; i += 2) {
            const val = (digits3[i] ?? 0) * 3 + (digits3[i + 1] ?? 0);
            digits9.push(val);
            groups.push({ from: `${digits3[i]}${digits3[i + 1]}`, to: val });
          }
          allSteps.push({ type: "grouping", descriptionKey: "stepGroupingDesc2", groups: groups.map((g) => ({ from: g.from, to: g.to })) });
          conversion = { result: digits9, steps: [] };
        } else {
          const digits3 = [];
          digits.forEach((d) => digits3.push(Math.floor(d / 3), d % 3));
          allSteps.push({ type: "mapping", descriptionKey: "stepMappingDesc2", mapping: digits.map((d) => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
          const step2 = convertViaPowerMapping(digits3, 3, 27);
          conversion = { result: step2.result, steps: step2.steps };
        }
      } else if (sB === 27 && tB === 10) {
        const step1 = convertViaPowerMapping(digits, 27, 3);
        allSteps.push(...step1.steps);
        const step2 = convertViaNonary(step1.result, 3, 10);
        allSteps.push(...step2.steps);
        conversion = { result: step2.result, steps: [] };
      } else if (sB === 10 && tB === 27) {
        const step1 = convertViaNonary(digits, 10, 3);
        allSteps.push(...step1.steps);
        const step2 = convertViaPowerMapping(step1.result, 3, 27);
        allSteps.push(...step2.steps);
        conversion = { result: step2.result, steps: [] };
      } else if (sB === 27 && tB === 2) {
        const step1 = convertViaPowerMapping(digits, 27, 3);
        allSteps.push(...step1.steps);
        const step2 = convertAdjacentBases(step1.result, 3, 2);
        allSteps.push(...step2.steps);
        conversion = { result: step2.result, steps: [] };
      } else if (sB === 2 && tB === 27) {
        const step1 = convertAdjacentBases(digits, 2, 3);
        allSteps.push(...step1.steps);
        const step2 = convertViaPowerMapping(step1.result, 3, 27);
        allSteps.push(...step2.steps);
        conversion = { result: step2.result, steps: [] };
      } else {
        allSteps.push({ type: "error", messageKey: "errorNotOptimized", args: { from: sB, to: tB } });
        state.conversionSteps = allSteps;
        renderAll();
        return;
      }
      if (conversion)
        allSteps.push(...conversion.steps);
      let finalResultStr = formatBaseOutput(conversion?.result || [], tB);
      if (tBal && (tB === 3 || tB === 9)) {
        const balConv = standardToBalanced(finalResultStr, tB, i18n);
        allSteps.push(...balConv.steps);
        finalResultStr = balConv.value;
        if (inputSign === -1) {
          finalResultStr = invertBalanced(finalResultStr, tB);
        }
      } else {
        if (inputSign === -1 && finalResultStr !== "0") {
          finalResultStr = "-" + finalResultStr;
        }
      }
      allSteps.push({ type: "result", value: finalResultStr, base: tB, balanced: tBal });
      state.conversionSteps = allSteps;
      renderAll();
    } catch (e) {
      state.conversionSteps = [{ type: "error", message: e.message }];
      renderAll();
    }
  };
  const updateBalancedUI = () => {
    dom.sourceBalancedWrapper.classList.toggle("hidden", state.sourceBase !== 3 && state.sourceBase !== 9);
    dom.targetBalancedWrapper.classList.toggle("hidden", state.targetBase !== 3 && state.targetBase !== 9);
    let helpKey = null;
    if (state.sourceBalanced) {
      if (state.sourceBase === 3)
        helpKey = "balancedTernaryHelp";
      else if (state.sourceBase === 9)
        helpKey = "symmetricNonaryHelp";
    }
    dom.sourceBalancedHelp.textContent = helpKey ? i18n(helpKey) : "";
    dom.sourceBalancedHelp.classList.toggle("hidden", !helpKey);
    dom.heptavintimalHelp.classList.toggle("hidden", state.sourceBase !== 27);
  };
  const renderComplexity = () => {
    if (!state.complexity) {
      dom.complexityBox.classList.add("hidden");
      return;
    }
    const description = i18n(state.complexity.descriptionKey);
    const efficiency = i18n(state.complexity.efficiencyKey);
    const { time, space } = state.complexity;
    const efficiencyClass = efficiency.includes(i18n("effOptimal")) || efficiency.includes(i18n("effLinear")) ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30";
    dom.complexityBox.innerHTML = `
                <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                    <i data-lucide="info" class="w-5 h-5 text-cyan-400"></i>
                    ${i18n("complexityTitle")}
                </h2>
                <div class="space-y-3">
                    <div class="flex items-center gap-3">
                        <span class="text-slate-400">Time:</span>
                        <code class="bg-slate-900 px-3 py-1 rounded text-blue-400 font-mono">${time}</code>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-slate-400">Space:</span>
                        <code class="bg-slate-900 px-3 py-1 rounded text-cyan-400 font-mono">${space}</code>
                    </div>
                    <div class="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                        <div class="text-sm text-slate-300 mb-2">${description}</div>
                        <div class="inline-block px-3 py-1 rounded-full text-sm font-semibold ${efficiencyClass}">${efficiency}</div>
                    </div>
                </div>`;
    dom.complexityBox.classList.remove("hidden");
  };
  const renderQuickResult = () => {
    const resultStep = state.conversionSteps.find((step) => step.type === "result");
    if (!resultStep) {
      dom.quickResultBox.classList.add("hidden");
      return;
    }
    const balancedText = resultStep.balanced ? ` (${i18n("stepBalanced")})` : "";
    dom.quickResultBox.innerHTML = `
                <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-green-400"></i>
                    ${i18n("quickResultTitle")}
                </h2>
                <div class="flex flex-col gap-2">
                     <div class="relative flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4 group">
                        <code id="resultValue" class="text-green-300 font-mono text-2xl break-all">${resultStep.value}</code>
                        <button id="copyButton" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded bg-slate-800 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" title="${i18n("copyTooltip")}">
                            <i data-lucide="copy" class="w-4 h-4"></i>
                        </button>
                    </div>
                    <div class="text-slate-400 text-sm text-right">
                        ${i18n("stepBase")} ${resultStep.base}${balancedText}
                    </div>
                </div>`;
    dom.quickResultBox.classList.remove("hidden");
    document.getElementById("copyButton")?.addEventListener("click", () => {
      navigator.clipboard.writeText(resultStep.value).then(() => {
        const btn = document.getElementById("copyButton");
        if (btn) {
          const icon = btn.querySelector("i");
          if (icon) {
            btn.innerHTML = '<span class="text-green-400 font-bold">✓</span>';
            setTimeout(() => {
              btn.innerHTML = '<i data-lucide="copy" class="w-4 h-4"></i>';
              if (window.lucide)
                window.lucide.createIcons();
            }, 2000);
          }
        }
      });
    });
  };
  const renderSteps = () => {
    if (state.conversionSteps.length === 0) {
      dom.stepsContainerWrapper.classList.add("hidden");
      return;
    }
    let html = "";
    state.conversionSteps.forEach((step) => {
      html += '<div class="bg-slate-900/50 rounded-lg p-4 border border-slate-700">';
      const balancedText = step.balanced ? ` (${i18n("stepBalanced")})` : "";
      switch (step.type) {
        case "input":
          html += `<div class="flex items-center gap-3"><span class="text-slate-400">${i18n("stepInput")}</span><code class="text-blue-400 font-mono text-lg">${step.value}</code><span class="text-slate-500">(${i18n("stepBase")} ${step.base}${balancedText})</span></div>`;
          break;
        case "direct_mapping":
          html += `<div><div class="text-cyan-400 font-semibold mb-2">${i18n(step.descriptionKey)}</div><div class="grid grid-cols-3 gap-2 mt-2">${step.mappings.map((m) => `<div class="bg-slate-800 p-2 rounded text-center font-mono text-sm"><span class="text-yellow-400">${m.nonaryDigit}</span><span class="text-slate-500 mx-2">→</span><span class="text-green-400">${m.ternaryPair}</span></div>`).join("")}</div>${step.result ? `<div class="mt-4 p-3 bg-slate-900 rounded font-mono"><span class="text-slate-400">${i18n("stepResult")} </span><span class="text-green-400 text-lg">${step.result}</span></div>` : ""}</div>`;
          break;
        case "mapping":
          html += `<div><div class="text-cyan-400 font-semibold mb-2">${i18n(step.descriptionKey)}</div><div class="grid grid-cols-3 gap-2 mt-2">${step.mapping.map((m) => `<div class="bg-slate-800 p-2 rounded text-center font-mono text-sm"><span class="text-yellow-400">${m.nonary || m.from}</span><span class="text-slate-500 mx-2">→</span><span class="text-green-400">${m.ternary || m.to}</span></div>`).join("")}</div></div>`;
          break;
        case "grouping":
          html += `<div><div class="text-green-400 font-semibold mb-2">${i18n(step.descriptionKey)}</div><div class="flex gap-2 flex-wrap">${step.groups.map((g) => `<div class="bg-slate-800 p-2 rounded text-center font-mono text-sm"><span class="text-green-400">${g.from}</span><span class="text-slate-500 mx-2">→</span><span class="text-yellow-400">${g.to}</span></div>`).join("")}</div></div>`;
          break;
        case "balanced_conversion":
          html += `<div class="border-l-4 border-purple-500 pl-4"><div class="text-purple-400 font-semibold">${i18n(step.descriptionKey, step.args)}</div><div class="text-sm text-slate-400 mt-1">${step.args.from} → ${step.args.to}</div></div>`;
          break;
        case "balanced_detail":
          html += `<div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"><div class="grid grid-cols-2 gap-4 mb-3"><div><span class="text-slate-400 text-sm">${i18n("stepOriginal")}</span><code class="block text-purple-400 font-mono text-lg mt-1">${step.original}</code></div><div><span class="text-slate-400 text-sm">${i18n("stepConverted")}</span><code class="block text-purple-300 font-mono text-lg mt-1">${step.converted}</code></div></div></div>`;
          break;
        case "bridge_start":
          html += `<div class="bg-cyan-500/10 border-l-4 border-cyan-500 pl-4 py-2"><div class="text-cyan-400 font-semibold">${i18n(step.descriptionKey, step.args)}</div><div class="text-slate-400 text-sm mt-1 font-mono">${step.args.from} → ${step.args.to}</div></div>`;
          break;
        case "start":
          html += `<div class="text-cyan-400 font-semibold">${i18n(step.descriptionKey, step.args)}<div class="text-sm text-slate-400 mt-1">${i18n(step.methodKey, step.args)}</div></div>`;
          break;
        case "iteration":
          html += `<div class="font-mono text-sm"><div class="text-slate-300 text-xs mt-2 p-2 bg-slate-800 rounded">${step.formula}</div></div>`;
          break;
        case "intermediate":
          html += `<div class="flex items-center gap-3"><i data-lucide="arrow-right" class="w-4 h-4 text-slate-500"></i><span class="text-slate-400">${i18n(step.descriptionKey, step.args)}:</span><code class="text-yellow-400 font-mono text-lg">${step.value}</code></div>`;
          break;
        case "result":
          html += `<div class="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4"><span class="text-green-400 font-semibold">${i18n("stepResult")}</span><code class="text-green-300 font-mono text-xl">${step.value}</code><span class="text-slate-500">(${i18n("stepBase")} ${step.base}${balancedText})</span></div>`;
          break;
        case "error":
          const errorMsg = step.messageKey ? i18n(step.messageKey, step.args) : step.message;
          html += `<div class="text-red-400 font-semibold">${errorMsg}</div>`;
          break;
      }
      html += "</div>";
    });
    dom.stepsContainer.innerHTML = html;
    dom.stepsContainerWrapper.classList.remove("hidden");
  };
  const renderAll = () => {
    if (state.complexity)
      renderComplexity();
    else
      dom.complexityBox.classList.add("hidden");
    if (state.conversionSteps.length > 0) {
      renderQuickResult();
      renderSteps();
    } else {
      dom.quickResultBox.classList.add("hidden");
      dom.stepsContainerWrapper.classList.add("hidden");
    }
    if (window.lucide)
      window.lucide.createIcons();
  };
  const validateRealTime = () => {
    const isValid = validateInput(state.inputValue, state.sourceBase, state.sourceBalanced);
    if (isValid) {
      dom.inputValue.classList.remove("border-red-500", "focus:border-red-500");
      dom.inputValue.classList.add("border-slate-600", "focus:border-blue-500");
    } else {
      dom.inputValue.classList.remove("border-slate-600", "focus:border-blue-500");
      dom.inputValue.classList.add("border-red-500", "focus:border-red-500");
    }
  };
  dom.inputValue.addEventListener("input", (e) => {
    state.inputValue = e.target.value;
    validateRealTime();
  });
  dom.swapButton.addEventListener("click", () => {
    const tempBase = state.sourceBase;
    state.sourceBase = state.targetBase;
    state.targetBase = tempBase;
    const tempBalanced = state.sourceBalanced;
    state.sourceBalanced = state.targetBalanced;
    state.targetBalanced = tempBalanced;
    dom.sourceBase.value = state.sourceBase.toString();
    dom.targetBase.value = state.targetBase.toString();
    dom.sourceBalanced.checked = state.sourceBalanced;
    dom.targetBalanced.checked = state.targetBalanced;
    updateBalancedUI();
    validateRealTime();
  });
  dom.sourceBase.addEventListener("change", (e) => {
    const newBase = parseInt(e.target.value);
    state.sourceBase = newBase;
    if (newBase !== 3 && newBase !== 9) {
      state.sourceBalanced = false;
      dom.sourceBalanced.checked = false;
    }
    updateBalancedUI();
    validateRealTime();
  });
  dom.targetBase.addEventListener("change", (e) => {
    const newBase = parseInt(e.target.value);
    state.targetBase = newBase;
    if (newBase !== 3 && newBase !== 9) {
      state.targetBalanced = false;
      dom.targetBalanced.checked = false;
    }
    updateBalancedUI();
  });
  dom.sourceBalanced.addEventListener("change", (e) => {
    state.sourceBalanced = e.target.checked;
    updateBalancedUI();
    validateRealTime();
  });
  dom.targetBalanced.addEventListener("change", (e) => state.targetBalanced = e.target.checked);
  dom.convertButton.addEventListener("click", performConversion);
  dom.langSelector.addEventListener("change", (e) => setLang(e.target.value));
  const init = () => {
    dom.langSelector.innerHTML = `
                <option value="en">English</option>
                <option value="pt">Português</option>
            `;
    const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 27];
    let optionsHtml = "";
    bases.forEach((b) => {
      let label = `Base ${b}`;
      if (b === 27)
        label += " (Heptavintimal)";
      optionsHtml += `<option value="${b}">${label}</option>`;
    });
    dom.sourceBase.innerHTML = optionsHtml;
    dom.targetBase.innerHTML = optionsHtml;
    dom.inputValue.value = state.inputValue;
    dom.sourceBase.value = state.sourceBase.toString();
    dom.targetBase.value = state.targetBase.toString();
    const initialLang = getInitialLang();
    setLang(initialLang);
    updateBalancedUI();
    validateRealTime();
    if (window.lucide)
      window.lucide.createIcons();
  };
  init();
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then((reg) => console.log("SW registered:", reg.scope)).catch((err) => console.error("SW registration failed:", err));
  });
}
