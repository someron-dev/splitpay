<h1>Hello, {user}!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<ExpenseFeed expenses={data.expenses} />

<script lang="ts">
    import { getCurrentUser } from "$lib/pocketbase/authentication";
    import ExpenseFeed from "$lib/components/feed/ExpenseFeed.svelte";

    let model = getCurrentUser();
    const user = model == null ? "" : model.name;

    export let data;
</script>