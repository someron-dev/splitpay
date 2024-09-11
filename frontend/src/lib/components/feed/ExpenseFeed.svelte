<ExpenseCreator createExpense={createExpense} user={user}/>

<table>
    <thead>
    <tr>
        <th>Subject</th>
        <th>Amount</th>
        <th>Created by</th>
        <th>Created at</th>
        <th />
    </tr>
    </thead>
    <tbody>
    {#each expenses as expense}
        <tr>
            <td>{expense.subject}</td>
            <td>{formatCurrency(dinero({ amount: expense.amount, currency: currency(expense.currency) }))}</td>
            <td>{expense.creator}</td>
            <td><Time timestamp={expense.created} relative live /></td>
            <td>
                <div role="group">
                    <button class="pico-background-red" on:click={deleteExpense(expense.id)}>Delete</button>
                </div>
            </td>
        </tr>
    {/each}
    </tbody>
    <tfoot>
    <tr>
        <th>Subject</th>
        <th>Amount</th>
        <th>Created by</th>
        <th>Created at</th>
        <th />
    </tr>
    </tfoot>
</table>

<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    import ExpenseCreator from "$lib/components/feed/ExpenseCreator.svelte";
    import Time from "svelte-time/Time.svelte";

    import { type Expense, pb, type User } from "$lib/pocketbase";
    import { dinero } from "dinero.js";
    import { currency, formatCurrency } from "$lib/currency";

    export let expenses: Expense[] = [];
    export let users: User[] = [];
    export let user: User;

    function deleteExpense(id: string): MouseEventHandler<HTMLButtonElement> {
        return () => {
            pb.collection("expenses").delete(id)
                .then(() => {
                    expenses = expenses.filter(expense => expense.id !== id);
                }).catch(alert);
        };
    }

    async function createExpense(newExpense: { subject: string; amount: number; }) {
        const result = await pb.collection("expenses").create({
            ...newExpense,
            creator: pb.authStore.model!.id
        }) as Expense;
        expenses = [result, ...expenses];
        newExpense.subject = "";
        newExpense.amount = 0;
    }
</script>