<table>
    <thead>
    <tr>
        <th>Subject</th>
        <th>Amount</th>
        <th>Created by</th>
    </tr>
    </thead>
    <tbody>
    {#each expenses as expense}
        <tr>
            <td>{expense.subject}</td>
            <td>{expense.amount}</td>
            <td>{expense.creator}</td>
        </tr>
    {/each}
    </tbody>
    <tfoot>
    <tr>
        <th>Subject</th>
        <th>Amount</th>
        <th>Created by</th>
    </tr>
    </tfoot>
</table>

<script lang="ts">
    import type { Expense } from "$lib/pocketbase";

    export let expenses: Expense[] = [];
</script>