export interface I18nSchema {
    pageTitle: string;
    mainTitle: string;
    subTitle: string;
    configTitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    heptavintimalHelp: string;
    sourceBaseLabel: string;
    targetBaseLabel: string;
    useBalancedLabel: string;
    convertButton: string;
    balancedTernaryHelp: string;
    symmetricNonaryHelp: string;
    complexityTitle: string;
    quickResultTitle: string;
    stepsTitle: string;
    optimizedCasesTitle: string;
    caseAdjacentTitle: string;
    caseAdjacentDesc: string;
    caseNonaryBridgeTitle: string;
    caseNonaryBridgeDesc: string;
    caseDoubleBridgeTitle: string;
    caseDoubleBridgeDesc: string;
    caseTernaryBridgeTitle: string;
    caseTernaryBridgeDesc: string;
    casePowersTitle: string;
    casePowersDesc: string;
    caseBalancedTitle: string;
    caseBalancedDesc: string;
    caseHeptaNonaryTitle: string;
    caseHeptaNonaryDesc: string;
    caseHeptaDecimalTitle: string;
    caseHeptaDecimalDesc: string;
    caseHeptaBinaryTitle: string;
    caseHeptaBinaryDesc: string;
    specialSystemsTitle: string;
    balancedTernaryTitle: string;
    balancedTernaryExample: string;
    symmetricNonaryTitle: string;
    symmetricNonaryDesc: string;
    heptavintimalTitle: string;
    heptavintimalAlphabet: string;
    heptavintimalDesc: string;
    descIdentity: string;
    descPowerMapping2: string;
    descPowerMapping3: string;
    descPowerMappingCompound: string;
    descQuadraticP: string;
    descBridgeNonary: string;
    descBridgeDouble: string;
    descBridgeHeptaDecimal: string;
    descBridgeHeptaBinary: string;
    descNotImplemented: string;
    effLinear: string;
    effOptimal: string;
    effOptimalQuadratic: string;
    effNotImplemented: string;
    stepInput: string;
    stepResult: string;
    stepBase: string;
    stepBalanced: string;
    stepBalancedConversion: string;
    stepBalancedFrom: string;
    stepBalancedTo: string;
    stepStandardTo: string;
    stepOriginal: string;
    stepConverted: string;
    stepBridgeStart: string;
    stepStartPtoP: string;
    stepStartMethod: string;
    stepIntermediate: string;
    stepIntermediateResult: string;
    stepMapping: string;
    stepGrouping: string;
    stepMappingDesc2: string;
    stepMappingDesc3: string;
    stepGroupingDesc2: string;
    stepGroupingDesc3: string;
    errorInvalidInput: string;
    errorIllegalDigit: string;
    errorNotOptimized: string;
    swapLabel: string;
    copyTooltip: string;
    copiedTooltip: string;
    validationError: string;
}

export const translations: Record<string, I18nSchema> = {
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
