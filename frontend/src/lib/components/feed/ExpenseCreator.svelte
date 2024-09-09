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
    <input
            type="number"
            aria-valuemin="0"
            placeholder="Amount"
            required
            aria-label="Amount"
            aria-describedby="amount-error"
            aria-invalid={!!errors.amount ? true : null}
            bind:value={newExpense.amount}
    >
    <small id="amount-error">{errors.amount ?? ""}</small>
    <button type="submit">Create</button>
</form>

<script lang="ts">
    import { isEmpty } from "validator";

    type ExpenseCreator = (data: {
        subject: string;
        amount: number;
    }) => void;

    const newExpense = {
        subject: "",
        amount: 0,
    };

    let errors: {
        subject?: string;
        amount?: string
    } = {};

    function onSubmit() {
        errors.subject = (isEmpty(newExpense.subject) || newExpense.subject === "Hello") ? "Subject is required" : undefined;
        errors.amount = (newExpense.amount <= 0) ? "Amount must be greater than 0" : undefined;

        if (!errors.subject && !errors.amount) {
            createExpense({ ...newExpense });

            newExpense.subject = "";
            newExpense.amount = 0;
        }
    }

    export let createExpense: ExpenseCreator;
</script>
