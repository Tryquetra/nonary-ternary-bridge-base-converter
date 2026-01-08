import { translations, type I18nSchema } from './translations';
import * as converter from './converter';

document.addEventListener('DOMContentLoaded', () => {
    // --- STATE ---
    interface State {
        inputValue: string;
        sourceBase: number;
        targetBase: number;
        sourceBalanced: boolean;
        targetBalanced: boolean;
        conversionSteps: converter.ConversionStep[];
        complexity: converter.ComplexityResult | null;
        currentLang: 'en' | 'pt';
    }

    let state: State = {
        inputValue: '1234',
        sourceBase: 10,
        targetBase: 3,
        sourceBalanced: false,
        targetBalanced: false,
        conversionSteps: [],
        complexity: null,
        currentLang: 'en' // Default language
    };

    // --- DOM ELEMENTS ---
    const dom = {
        langSelector: document.getElementById('langSelector') as HTMLSelectElement,
        inputValue: document.getElementById('inputValue') as HTMLInputElement,
        sourceBase: document.getElementById('sourceBase') as HTMLSelectElement,
        targetBase: document.getElementById('targetBase') as HTMLSelectElement,
        sourceBalanced: document.getElementById('sourceBalanced') as HTMLInputElement,
        targetBalanced: document.getElementById('targetBalanced') as HTMLInputElement,
        sourceBalancedWrapper: document.getElementById('sourceBalancedWrapper') as HTMLElement,
        targetBalancedWrapper: document.getElementById('targetBalancedWrapper') as HTMLElement,
        sourceBalancedHelp: document.getElementById('sourceBalancedHelp') as HTMLElement,
        heptavintimalHelp: document.getElementById('heptavintimalHelp') as HTMLElement,
        swapButton: document.getElementById('swapButton') as HTMLButtonElement,
        convertButton: document.getElementById('convertButton') as HTMLButtonElement,
        complexityBox: document.getElementById('complexityBox') as HTMLElement,
        quickResultBox: document.getElementById('quickResultBox') as HTMLElement,
        stepsContainerWrapper: document.getElementById('stepsContainerWrapper') as HTMLElement,
        stepsContainer: document.getElementById('stepsContainer') as HTMLElement,
    };

    // --- I18N CORE FUNCTIONS ---

    const i18n = (key: string, args: Record<string, any> = {}): string => {
        const langData = translations[state.currentLang];
        let text = (langData as any)[key] || key;
        for (const argKey in args) {
            text = text.replace(`{${argKey}}`, args[argKey]);
        }
        return text;
    };

    const setLang = (lang: string) => {
        const selectedLang = (lang === 'pt') ? 'pt' : 'en';
        state.currentLang = selectedLang;
        document.documentElement.lang = selectedLang;
        dom.langSelector.value = selectedLang;

        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            const htmlEl = el as HTMLElement;
            const key = htmlEl.dataset.i18nKey;
            if (!key) return;
            const translation = i18n(key);

            if (htmlEl.tagName === 'INPUT' && (htmlEl as HTMLInputElement).type === 'text') {
                (htmlEl as HTMLInputElement).placeholder = translation;
            } else {
                htmlEl.innerHTML = translation;
            }
        });

        updateBalancedUI();
        renderAll();
        if ((window as any).lucide) (window as any).lucide.createIcons();
    };

    const getInitialLang = (): 'en' | 'pt' => {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang');
        return (lang === 'pt') ? 'pt' : 'en';
    };

    // --- CORE LOGIC WRAPPER ---

    const performConversion = () => {
        try {
            const sB = state.sourceBase, tB = state.targetBase;
            const sBal = state.sourceBalanced, tBal = state.targetBalanced;

            const getValidChars = () => {
                if (sBal) {
                    return sB === 3 ? '{-, 0, +}' : '{W, X, Y, Z, 0, 1, 2, 3, 4}';
                }
                return sB === 27 ? `Alfabeto Jones: ${converter.HEPT_DIGITS}` : (sB <= 10 ? `{0-${sB - 1}}` : `{0-9, A-${converter.getDigitChar(sB - 1, sB)}}`);
            };

            if (sB === tB && sBal === tBal) {
                if (!converter.validateInput(state.inputValue, sB, sBal)) {
                    state.conversionSteps = [{ type: 'error', messageKey: 'errorInvalidInput', args: { chars: getValidChars() } }];
                    renderAll(); return;
                }
                state.complexity = converter.analyzeComplexity(sB, tB);
                state.conversionSteps = [{ type: 'result', value: state.inputValue, base: tB, balanced: tBal }];
                renderAll(); return;
            }

            if (!converter.validateInput(state.inputValue, sB, sBal)) {
                state.conversionSteps = [{ type: 'error', messageKey: 'errorInvalidInput', args: { chars: getValidChars() } }];
                renderAll(); return;
            }

            // --- SIGN PROCESSING ---
            let inputSign = 1;
            let processedInput = state.inputValue;
            let wasBalancedNegative = false; // Flag to track if balanced input was intrinsically negative

            if (sBal) {
                // Determine sign for Balanced Input
                // Start from MSD (most significant digit) - first non-zero
                // Base 3: '-' is negative. Base 9: W(-4), X(-3), Y(-2), Z(-1) are negative.
                for (const char of processedInput) {
                    if (char === '0') continue;
                    if (sB === 3) {
                        if (char === '-') { inputSign = -1; wasBalancedNegative = true; }
                        break;
                    } else if (sB === 9) {
                        if (['W', 'X', 'Y', 'Z'].includes(char.toUpperCase())) { inputSign = -1; wasBalancedNegative = true; }
                        break;
                    }
                }
                if (inputSign === -1) {
                    processedInput = converter.invertBalanced(processedInput, sB);
                }
            } else {
                // Standard Input
                if (processedInput.startsWith('-')) {
                    inputSign = -1;
                    processedInput = processedInput.substring(1);
                }
            }

            // --- CONVERSION PIPELINE (ABSOLUTE VALUE) ---
            const allSteps: converter.ConversionStep[] = [];

            if (sBal && (sB === 3 || sB === 9)) {
                // If it was negative, we already inverted it to be positive "processedInput"
                const balConv = converter.balancedToStandard(processedInput, sB, i18n);
                allSteps.push(...balConv.steps);
                processedInput = balConv.value;
            }

            const digits: number[] = [];
            processedInput = processedInput.toUpperCase();
            if (processedInput.length > 1 && sB !== 27) {
                processedInput = processedInput.replace(/^0+(?=\d|[A-Z])/, '');
            }
            if (processedInput === '') processedInput = '0';

            for (let char of processedInput) {
                const val = converter.getDigitValue(char, sB);
                if (isNaN(val) || val === -1 || val >= sB) {
                    throw new Error(i18n('errorIllegalDigit', { char: char }));
                }
                digits.push(val);
            }

            state.complexity = converter.analyzeComplexity(sB, tB);

            let conversion: converter.ConversionResult | undefined;
            const diff = Math.abs(tB - sB);

            if (diff === 1) {
                conversion = converter.convertAdjacentBases(digits, sB, tB);
            } else if ((sB === 10 && tB === 3) || (sB === 3 && tB === 10)) {
                conversion = converter.convertViaNonary(digits, sB, tB);
            } else if ((sB === 10 && tB === 2) || (sB === 2 && tB === 10)) {
                allSteps.push({ type: 'bridge_start', descriptionKey: 'stepBridgeStart', args: { from: 10, to: 2, path: 'dupla' } });
                if (sB === 10) {
                    const step1 = converter.convertAdjacentBases(digits, 10, 9);
                    allSteps.push(...step1.steps);
                    allSteps.push({ type: 'intermediate', descriptionKey: 'stepIntermediateResult', args: { base: 9 }, value: converter.formatBaseOutput(step1.result, 9) });
                    const tDigits: number[] = [];
                    step1.result.forEach(d => tDigits.push(Math.floor(d / 3), d % 3));
                    while (tDigits.length > 1 && tDigits[0] === 0) tDigits.shift();
                    allSteps.push({ type: 'mapping', descriptionKey: 'stepMappingDesc2', mapping: step1.result.map(d => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
                    conversion = converter.convertAdjacentBases(tDigits, 3, 2);
                } else {
                    const step1 = converter.convertAdjacentBases(digits, 2, 3);
                    allSteps.push(...step1.steps);
                    const d3 = [...step1.result];
                    if (d3.length % 2 !== 0) d3.unshift(0);
                    const nDigits: number[] = [];
                    for (let i = 0; i < d3.length; i += 2) nDigits.push((d3[i] ?? 0) * 3 + (d3[i + 1] ?? 0));
                    allSteps.push({ type: 'grouping', descriptionKey: 'stepGroupingDesc2', groups: nDigits.map((d, i) => ({ from: `${d3[i * 2]}${d3[i * 2 + 1]}`, to: d })) });
                    conversion = converter.convertAdjacentBases(nDigits, 9, 10);
                }
            } else if ((sB === 9 && tB === 2) || (sB === 2 && tB === 9)) {
                allSteps.push({ type: 'bridge_start', descriptionKey: 'stepBridgeStart', args: { from: sB, to: tB, path: 'ternária' } });
                if (sB === 9) {
                    const tDigits: number[] = [];
                    digits.forEach(d => tDigits.push(Math.floor(d / 3), d % 3));
                    while (tDigits.length > 1 && tDigits[0] === 0) tDigits.shift();
                    allSteps.push({ type: 'mapping', descriptionKey: 'stepMappingDesc2', mapping: digits.map(d => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
                    conversion = converter.convertAdjacentBases(tDigits, 3, 2);
                } else {
                    const step1 = converter.convertAdjacentBases(digits, 2, 3);
                    allSteps.push(...step1.steps);
                    const d3 = [...step1.result];
                    if (d3.length % 2 !== 0) d3.unshift(0);
                    const nDigits: number[] = [];
                    for (let i = 0; i < d3.length; i += 2) nDigits.push((d3[i] ?? 0) * 3 + (d3[i + 1] ?? 0));
                    allSteps.push({ type: 'grouping', descriptionKey: 'stepGroupingDesc2', groups: nDigits.map((d, i) => ({ from: `${d3[i * 2]}${d3[i * 2 + 1]}`, to: d })) });
                    conversion = { result: nDigits, steps: [] };
                }
            }
            else if ((sB === 27 && tB === 3) || (sB === 3 && tB === 27)) {
                conversion = converter.convertViaPowerMapping(digits, sB, tB);
            }
            else if ((sB === 27 && tB === 9) || (sB === 9 && tB === 27)) {
                if (sB === 27) {
                    const step1 = converter.convertViaPowerMapping(digits, 27, 3);
                    allSteps.push(...step1.steps);
                    const digits3 = step1.result;
                    if (digits3.length % 2 !== 0) digits3.unshift(0);
                    const digits9: number[] = []; const groups: any[] = [];
                    for (let i = 0; i < digits3.length; i += 2) {
                        const val = (digits3[i] ?? 0) * 3 + (digits3[i + 1] ?? 0);
                        digits9.push(val);
                        groups.push({ from: `${digits3[i]}${digits3[i + 1]}`, to: val });
                    }
                    allSteps.push({ type: 'grouping', descriptionKey: 'stepGroupingDesc2', groups: groups.map(g => ({ from: g.from, to: g.to })) });
                    conversion = { result: digits9, steps: [] };
                } else {
                    const digits3: number[] = [];
                    digits.forEach(d => digits3.push(Math.floor(d / 3), d % 3));
                    allSteps.push({ type: 'mapping', descriptionKey: 'stepMappingDesc2', mapping: digits.map(d => ({ nonary: d, ternary: `${Math.floor(d / 3)}${d % 3}` })) });
                    const step2 = converter.convertViaPowerMapping(digits3, 3, 27);
                    conversion = { result: step2.result, steps: step2.steps };
                }
            }
            else if ((sB === 27 && tB === 10)) {
                const step1 = converter.convertViaPowerMapping(digits, 27, 3);
                allSteps.push(...step1.steps);
                const step2 = converter.convertViaNonary(step1.result, 3, 10);
                allSteps.push(...step2.steps);
                conversion = { result: step2.result, steps: [] };
            }
            else if ((sB === 10 && tB === 27)) {
                const step1 = converter.convertViaNonary(digits, 10, 3);
                allSteps.push(...step1.steps);
                const step2 = converter.convertViaPowerMapping(step1.result, 3, 27);
                allSteps.push(...step2.steps);
                conversion = { result: step2.result, steps: [] };
            }
            else if ((sB === 27 && tB === 2)) {
                const step1 = converter.convertViaPowerMapping(digits, 27, 3);
                allSteps.push(...step1.steps);
                const step2 = converter.convertAdjacentBases(step1.result, 3, 2);
                allSteps.push(...step2.steps);
                conversion = { result: step2.result, steps: [] };
            }
            else if ((sB === 2 && tB === 27)) {
                const step1 = converter.convertAdjacentBases(digits, 2, 3);
                allSteps.push(...step1.steps);
                const step2 = converter.convertViaPowerMapping(step1.result, 3, 27);
                allSteps.push(...step2.steps);
                conversion = { result: step2.result, steps: [] };
            }
            else {
                allSteps.push({ type: 'error', messageKey: 'errorNotOptimized', args: { from: sB, to: tB } });
                state.conversionSteps = allSteps;
                renderAll(); return;
            }

            if (conversion) allSteps.push(...conversion.steps);

            let finalResultStr = converter.formatBaseOutput(conversion?.result || [], tB);

            // --- SIGN RE-APPLICATION ---
            if (tBal && (tB === 3 || tB === 9)) {
                // If we are balanced, convert absolute value first
                const balConv = converter.standardToBalanced(finalResultStr, tB, i18n);
                allSteps.push(...balConv.steps);
                finalResultStr = balConv.value;

                // If original input was negative, invert it back
                if (inputSign === -1) {
                    finalResultStr = converter.invertBalanced(finalResultStr, tB);
                }
            } else {
                // Standard Target
                if (inputSign === -1 && finalResultStr !== '0') {
                    finalResultStr = '-' + finalResultStr;
                }
            }

            allSteps.push({ type: 'result', value: finalResultStr, base: tB, balanced: tBal });
            state.conversionSteps = allSteps;
            renderAll();

        } catch (e: any) {
            state.conversionSteps = [{ type: 'error', message: e.message }];
            renderAll();
        }
    };

    // --- UI UPDATES ---
    const updateBalancedUI = () => {
        dom.sourceBalancedWrapper.classList.toggle('hidden', state.sourceBase !== 3 && state.sourceBase !== 9);
        dom.targetBalancedWrapper.classList.toggle('hidden', state.targetBase !== 3 && state.targetBase !== 9);

        let helpKey = null;
        if (state.sourceBalanced) {
            if (state.sourceBase === 3) helpKey = 'balancedTernaryHelp';
            else if (state.sourceBase === 9) helpKey = 'symmetricNonaryHelp';
        }

        dom.sourceBalancedHelp.textContent = helpKey ? i18n(helpKey) : '';
        dom.sourceBalancedHelp.classList.toggle('hidden', !helpKey);

        dom.heptavintimalHelp.classList.toggle('hidden', state.sourceBase !== 27);
    };

    const renderComplexity = () => {
        if (!state.complexity) {
            dom.complexityBox.classList.add('hidden');
            return;
        }

        const description = i18n(state.complexity.descriptionKey);
        const efficiency = i18n(state.complexity.efficiencyKey);

        const { time, space } = state.complexity;
        const efficiencyClass = (efficiency.includes(i18n('effOptimal')) || efficiency.includes(i18n('effLinear')))
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30';

        dom.complexityBox.innerHTML = `
                <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                    <i data-lucide="info" class="w-5 h-5 text-cyan-400"></i>
                    ${i18n('complexityTitle')}
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
        dom.complexityBox.classList.remove('hidden');
    };

    const renderQuickResult = () => {
        const resultStep = state.conversionSteps.find(step => step.type === 'result');
        if (!resultStep) {
            dom.quickResultBox.classList.add('hidden');
            return;
        }
        const balancedText = resultStep.balanced ? ` (${i18n('stepBalanced')})` : '';
        dom.quickResultBox.innerHTML = `
                <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-green-400"></i>
                    ${i18n('quickResultTitle')}
                </h2>
                <div class="flex flex-col gap-2">
                     <div class="relative flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4 group">
                        <code id="resultValue" class="text-green-300 font-mono text-2xl break-all">${resultStep.value}</code>
                        <button id="copyButton" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded bg-slate-800 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" title="${i18n('copyTooltip')}">
                            <i data-lucide="copy" class="w-4 h-4"></i>
                        </button>
                    </div>
                    <div class="text-slate-400 text-sm text-right">
                        ${i18n('stepBase')} ${resultStep.base}${balancedText}
                    </div>
                </div>`;
        dom.quickResultBox.classList.remove('hidden');

        // Attach copy listener
        document.getElementById('copyButton')?.addEventListener('click', () => {
             navigator.clipboard.writeText(resultStep.value).then(() => {
                 const btn = document.getElementById('copyButton');
                 if(btn) {
                     const icon = btn.querySelector('i');
                     if(icon) {
                         // Temporary checkmark
                         // Re-using lucide might be tricky if not re-run, so just simple replacement
                         btn.innerHTML = '<span class="text-green-400 font-bold">✓</span>';
                         setTimeout(() => {
                             btn.innerHTML = '<i data-lucide="copy" class="w-4 h-4"></i>';
                             if ((window as any).lucide) (window as any).lucide.createIcons();
                         }, 2000);
                     }
                 }
             });
        });
    };

    const renderSteps = () => {
        if (state.conversionSteps.length === 0) {
            dom.stepsContainerWrapper.classList.add('hidden');
            return;
        }
        let html = '';
        state.conversionSteps.forEach(step => {
            html += '<div class="bg-slate-900/50 rounded-lg p-4 border border-slate-700">';
            const balancedText = step.balanced ? ` (${i18n('stepBalanced')})` : '';

            switch (step.type) {
                case 'input':
                    html += `<div class="flex items-center gap-3"><span class="text-slate-400">${i18n('stepInput')}</span><code class="text-blue-400 font-mono text-lg">${step.value}</code><span class="text-slate-500">(${i18n('stepBase')} ${step.base}${balancedText})</span></div>`;
                    break;
                case 'direct_mapping':
                    html += `<div><div class="text-cyan-400 font-semibold mb-2">${i18n(step.descriptionKey!)}</div><div class="grid grid-cols-3 gap-2 mt-2">${step.mappings!.map(m => `<div class="bg-slate-800 p-2 rounded text-center font-mono text-sm"><span class="text-yellow-400">${m.nonaryDigit}</span><span class="text-slate-500 mx-2">→</span><span class="text-green-400">${m.ternaryPair}</span></div>`).join('')}</div>${step.result ? `<div class="mt-4 p-3 bg-slate-900 rounded font-mono"><span class="text-slate-400">${i18n('stepResult')} </span><span class="text-green-400 text-lg">${step.result}</span></div>` : ''}</div>`;
                    break;
                case 'mapping':
                    html += `<div><div class="text-cyan-400 font-semibold mb-2">${i18n(step.descriptionKey!)}</div><div class="grid grid-cols-3 gap-2 mt-2">${step.mapping!.map(m => `<div class="bg-slate-800 p-2 rounded text-center font-mono text-sm"><span class="text-yellow-400">${m.nonary || m.from}</span><span class="text-slate-500 mx-2">→</span><span class="text-green-400">${m.ternary || m.to}</span></div>`).join('')}</div></div>`;
                    break;
                case 'grouping':
                    html += `<div><div class="text-green-400 font-semibold mb-2">${i18n(step.descriptionKey!)}</div><div class="flex gap-2 flex-wrap">${step.groups!.map(g => `<div class="bg-slate-800 p-2 rounded text-center font-mono text-sm"><span class="text-green-400">${g.from}</span><span class="text-slate-500 mx-2">→</span><span class="text-yellow-400">${g.to}</span></div>`).join('')}</div></div>`;
                    break;
                case 'balanced_conversion':
                    html += `<div class="border-l-4 border-purple-500 pl-4"><div class="text-purple-400 font-semibold">${i18n(step.descriptionKey!, step.args)}</div><div class="text-sm text-slate-400 mt-1">${step.args!.from} → ${step.args!.to}</div></div>`;
                    break;
                case 'balanced_detail':
                    html += `<div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"><div class="grid grid-cols-2 gap-4 mb-3"><div><span class="text-slate-400 text-sm">${i18n('stepOriginal')}</span><code class="block text-purple-400 font-mono text-lg mt-1">${step.original}</code></div><div><span class="text-slate-400 text-sm">${i18n('stepConverted')}</span><code class="block text-purple-300 font-mono text-lg mt-1">${step.converted}</code></div></div></div>`;
                    break;
                case 'bridge_start':
                    html += `<div class="bg-cyan-500/10 border-l-4 border-cyan-500 pl-4 py-2"><div class="text-cyan-400 font-semibold">${i18n(step.descriptionKey!, step.args)}</div><div class="text-slate-400 text-sm mt-1 font-mono">${step.args!.from} → ${step.args!.to}</div></div>`;
                    break;
                case 'start':
                    html += `<div class="text-cyan-400 font-semibold">${i18n(step.descriptionKey!, step.args)}<div class="text-sm text-slate-400 mt-1">${i18n(step.methodKey!, step.args)}</div></div>`;
                    break;
                case 'iteration':
                    html += `<div class="font-mono text-sm"><div class="text-slate-300 text-xs mt-2 p-2 bg-slate-800 rounded">${step.formula}</div></div>`;
                    break;
                case 'intermediate':
                    html += `<div class="flex items-center gap-3"><i data-lucide="arrow-right" class="w-4 h-4 text-slate-500"></i><span class="text-slate-400">${i18n(step.descriptionKey!, step.args)}:</span><code class="text-yellow-400 font-mono text-lg">${step.value}</code></div>`;
                    break;
                case 'result':
                    html += `<div class="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4"><span class="text-green-400 font-semibold">${i18n('stepResult')}</span><code class="text-green-300 font-mono text-xl">${step.value}</code><span class="text-slate-500">(${i18n('stepBase')} ${step.base}${balancedText})</span></div>`;
                    break;
                case 'error':
                    const errorMsg = step.messageKey ? i18n(step.messageKey, step.args) : step.message;
                    html += `<div class="text-red-400 font-semibold">${errorMsg}</div>`;
                    break;
            }
            html += '</div>';
        });
        dom.stepsContainer.innerHTML = html;
        dom.stepsContainerWrapper.classList.remove('hidden');
    };

    const renderAll = () => {
        if (state.complexity) renderComplexity();
        else dom.complexityBox.classList.add('hidden');

        if (state.conversionSteps.length > 0) {
            renderQuickResult();
            renderSteps();
        } else {
            dom.quickResultBox.classList.add('hidden');
            dom.stepsContainerWrapper.classList.add('hidden');
        }
        if ((window as any).lucide) (window as any).lucide.createIcons();
    };

    const validateRealTime = () => {
        const isValid = converter.validateInput(state.inputValue, state.sourceBase, state.sourceBalanced);
        if (isValid) {
            dom.inputValue.classList.remove('border-red-500', 'focus:border-red-500');
            dom.inputValue.classList.add('border-slate-600', 'focus:border-blue-500');
        } else {
            dom.inputValue.classList.remove('border-slate-600', 'focus:border-blue-500');
            dom.inputValue.classList.add('border-red-500', 'focus:border-red-500');
        }
    };

    // --- EVENT LISTENERS ---
    dom.inputValue.addEventListener('input', (e) => {
        state.inputValue = (e.target as HTMLInputElement).value;
        validateRealTime();
    });
    
    dom.swapButton.addEventListener('click', () => {
        // Swap bases
        const tempBase = state.sourceBase;
        state.sourceBase = state.targetBase;
        state.targetBase = tempBase;
        
        // Swap balanced toggle states
        const tempBalanced = state.sourceBalanced;
        state.sourceBalanced = state.targetBalanced;
        state.targetBalanced = tempBalanced;

        // Update DOM
        dom.sourceBase.value = state.sourceBase.toString();
        dom.targetBase.value = state.targetBase.toString();
        dom.sourceBalanced.checked = state.sourceBalanced;
        dom.targetBalanced.checked = state.targetBalanced;

        updateBalancedUI();
        validateRealTime();
        // Optional: Perform conversion immediately after swap?
        // performConversion(); 
    });

    dom.sourceBase.addEventListener('change', (e) => {
        const newBase = parseInt((e.target as HTMLSelectElement).value);
        state.sourceBase = newBase;
        if (newBase !== 3 && newBase !== 9) {
            state.sourceBalanced = false;
            dom.sourceBalanced.checked = false;
        }
        updateBalancedUI();
        validateRealTime();
    });
    dom.targetBase.addEventListener('change', (e) => {
        const newBase = parseInt((e.target as HTMLSelectElement).value);
        state.targetBase = newBase;
        if (newBase !== 3 && newBase !== 9) {
            state.targetBalanced = false;
            dom.targetBalanced.checked = false;
        }
        updateBalancedUI();
    });
    dom.sourceBalanced.addEventListener('change', (e) => {
        state.sourceBalanced = (e.target as HTMLInputElement).checked;
        updateBalancedUI();
        validateRealTime();
    });
    dom.targetBalanced.addEventListener('change', (e) => state.targetBalanced = (e.target as HTMLInputElement).checked);
    dom.convertButton.addEventListener('click', performConversion);
    dom.langSelector.addEventListener('change', (e) => setLang((e.target as HTMLSelectElement).value));

    // --- INITIALIZATION ---
    const init = () => {
        dom.langSelector.innerHTML = `
                <option value="en">English</option>
                <option value="pt">Português</option>
            `;

        const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 27];
        let optionsHtml = '';
        bases.forEach(b => {
            let label = `Base ${b}`;
            if (b === 27) label += " (Heptavintimal)";
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
        if ((window as any).lucide) (window as any).lucide.createIcons();
    };

    init();
});

// --- SERVICE WORKER REGISTRATION ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.error('SW registration failed:', err));
    });
}
