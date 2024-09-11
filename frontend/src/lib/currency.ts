import { toDecimal, type Dinero, type Currency } from "dinero.js";
import * as currencies from "@dinero.js/currencies";

export function formatCurrency(amount: Dinero<number>, locale = navigator.language) {
    return toDecimal(amount, ({ currency, value }) =>
        Number(value).toLocaleString(locale, {
            style: 'currency',
            currency: currency.code,
        })
    );
}

export const currencyCodes = Object.keys(currencies);

export function currency(code: string) {
    if(!(code in currencies)) throw new Error("No currency with code " + code);
    // @ts-ignore
    return currencies[code] as Currency<number>;
}

export function currencyBase(currency: Currency<number>) {
    return Array.isArray(currency.base) ? currency.base[0] : currency.base;
}
