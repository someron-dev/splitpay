<h1>{data.user.name}</h1>

<ExpenseFeed expenses={data.expenses} user={data.user} />

<script lang="ts">
    import ExpenseFeed from "$lib/components/feed/ExpenseFeed.svelte";

    export let data;
</script>
