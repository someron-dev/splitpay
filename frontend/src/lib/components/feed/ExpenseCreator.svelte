<form on:submit|preventDefault={onSubmit}>
    <input
            type="text"
            placeholder="Subject"
            required
            aria-label="Subject"
            aria-describedby="subject-error"
            aria-invalid={!!errors.subject ? true : null}
            bind:value={newExpense.subject}
    >
    <small id="subject-error">{errors.subject ?? ""}</small>

    <div role="group">
        <select bind:value={newExpense.currency} aria-label="Select a currency" required>
            <option selected disabled value={null}>
                Select a currency
            </option>
            {#each currencyCodes as code}
                <option value={currency(code)}>{code}</option>
            {/each}
        </select>

        <input
                type="number"
                aria-valuemin="0"
                step={newExpense.currency === null ? 0.01 : Math.pow(currencyBase(newExpense.currency), -newExpense.currency.exponent)}
                placeholder="Amount"
                required
                aria-label="Amount"
                aria-describedby="amount-error"
                aria-invalid={!!errors.amount ? true : null}
                bind:value={newExpense.amount}
        >
        <small id="amount-error">{errors.amount ?? ""}</small>
    </div>

    <button type="submit">Create</button>
</form>

<script lang="ts">
    import "$lib/style/utils.css";
    import { isEmpty } from "validator";
    import { currency, currencyBase, currencyCodes } from "$lib/currency";
    import type { Currency } from "dinero.js";
    import {getCurrentUser} from "$lib/pocketbase/authentication";
    import type {User} from "$lib/pocketbase";

    type ExpenseCreator = (data: {
        subject: string;
        amount: number;
        currency: string;
        sharedBy: string[];
    }) => void;

    const newExpense = {
        subject: "",
        amount: 0,
        currency: null as Currency<number> | null
    };

    let errors: {
        subject?: string;
        amount?: string
    } = {};

    function onSubmit() {
        errors.subject = (isEmpty(newExpense.subject) || newExpense.subject === "Hello") ? "Subject is required" : undefined;
        errors.amount = (newExpense.amount <= 0) ? "Amount must be greater than 0" : undefined;

        if (!errors.subject && !errors.amount && newExpense.currency !== null) {
            const singleUnit = Math.pow(currencyBase(newExpense.currency), newExpense.currency.exponent);

            createExpense({
                subject: newExpense.subject,
                amount: singleUnit * newExpense.amount,
                currency: newExpense.currency?.code,
                sharedBy: [ getCurrentUser()!.id, user.id ].sort() // should be sorted to allow for SQL grouping
            });

            newExpense.subject = "";
            newExpense.amount = 0;
            newExpense.currency = null;
        }
    }

    export let createExpense: ExpenseCreator;

    export let user: User;
</script>
