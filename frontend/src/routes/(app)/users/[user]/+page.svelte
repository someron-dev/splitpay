<h1>{data.user.name}</h1>

<ul>
    {#each data.totals as total}
        <li>
            {#if isPositive(total[1])}
                {data.user.name} owes you {formatCurrency(total[1])}
            {:else}
                You owe {data.user.name} {formatCurrency(multiply(total[1], -1))}
            {/if}
        </li>
    {/each}
</ul>

<ExpenseFeed expenses={data.expenses} user={data.user} />

<script lang="ts">
    import ExpenseFeed from "$lib/components/feed/ExpenseFeed.svelte";
    import { isPositive, multiply } from "dinero.js";
    import { formatCurrency } from "$lib/currency";

    export let data;
</script>
