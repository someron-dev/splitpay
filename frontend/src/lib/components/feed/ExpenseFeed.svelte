<ExpenseCreator createExpense={createExpense} user={user}/>

{#each expenses as expense}
    <article>
        <header class="flex">
            <span class="left">
                <b>{expense.subject.substring(0, 30)}</b>
                {#if expense.subject.length > 30}
                    <b data-tooltip={expense.subject}>...</b>
                {/if}
            </span>
            <span class="right {'pico-color-' + (expense.creator === user.id ? 'red' : 'green')}">
                {formatCurrency(
                    allocate(dinero({ amount: expense.amount, currency: currency(expense.currency) }), [expense.sharedBy.length - 1, 1])[0]
                )}
            </span>
        </header>

        <ul>
            {#each expense.sharedBy as sharedBy}
                <li>
                    {sharedBy === user.id ? user.name : "You"}
                    {sharedBy === expense.creator ? " paid " : " owe(s) "}
                    {formatCurrency(
                        allocate(dinero({ amount: expense.amount, currency: currency(expense.currency) }), [1, expense.sharedBy.length - 1])[0]
                    )}
                </li>
            {/each}
        </ul>

        <footer class="grid">
            <div>
                <details>
                    <summary>
                        {expense.creator === user.id ? user.name : "You"},
                        <Time timestamp={expense.created} relative live />
                    </summary>
                    <button class="pico-background-red" on:click={deleteExpense(expense.id)}>Delete</button>
                </details>
            </div>
        </footer>
    </article>
{/each}

<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    import ExpenseCreator from "$lib/components/feed/ExpenseCreator.svelte";
    import Time from "svelte-time/Time.svelte";

    import { type Expense, pb, type OtherUser } from "$lib/pocketbase";
    import { dinero, allocate } from "dinero.js";
    import { currency, formatCurrency } from "$lib/currency";

    export let expenses: Expense[] = [];
    export let user: OtherUser;

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

<style>
    .left {
        justify-self: left;
    }

    .right {
        justify-self: right;
    }

    .flex {
        display: flex;
        justify-content: space-between;
    }
</style>
