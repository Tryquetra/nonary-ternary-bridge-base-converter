import { expect, test, describe } from "bun:test";
import { translations, type I18nSchema } from "../src/translations";

describe("Internationalization Data", () => {
    test("English and Portuguese have identical keys", () => {
        const enKeys = Object.keys(translations.en ?? {}).sort();
        const ptKeys = Object.keys(translations.pt ?? {}).sort();

        expect(enKeys).toEqual(ptKeys);
    });

    test("All i18n values are non-empty", () => {
        for (const lang in translations) {
            const schema = translations[lang] as I18nSchema;
            for (const key in schema) {
                expect(schema[key as keyof I18nSchema]).not.toBe("");
            }
        }
    });

    test("Meta strings are correct", () => {
        expect(translations.en?.mainTitle).toBe("Nonary Arithmetic");
        expect(translations.pt?.mainTitle).toBe("Aritmética Nonária");
    });
});
