<ExpenseCreator createExpense={createExpense} />

<table>
    <thead>
    <tr>
        <th>Subject</th>
        <th>Amount</th>
        <th>Created by</th>
        <th />
    </tr>
    </thead>
    <tbody>
    {#each expenses as expense}
        <tr>
            <td>{expense.subject}</td>
            <td>{expense.amount}</td>
            <td>{expense.creator}</td>
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
        <th />
    </tr>
    </tfoot>
</table>

<script lang="ts">
    import { type Expense, pb } from "$lib/pocketbase";
    import type { MouseEventHandler } from "svelte/elements";
    import ExpenseCreator from "$lib/components/feed/ExpenseCreator.svelte";

    export let expenses: Expense[] = [];

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
            creator: pb.authStore.model!.id,
        }) as Expense;
        expenses = [result, ...expenses];
        newExpense.subject = "";
        newExpense.amount = 0;
    }
</script>