import { toDecimal, type Dinero } from "dinero.js";

export function formatCurrency(amount: Dinero<number>, locale = navigator.language) {
    return toDecimal(amount, ({ currency, value }) =>
        Number(value).toLocaleString(locale, {
            style: 'currency',
            currency: currency.code,
        })
    );
}