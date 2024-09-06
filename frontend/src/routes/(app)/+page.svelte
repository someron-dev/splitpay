<h1>Hello, {user}!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="/test">Test page</a>

<script lang="ts">
    import { getCurrentUser } from "$lib/authentication";
    import ExpenseFeed from "$lib/components/ExpenseFeed.svelte";

    let model = getCurrentUser();
    const user = model == null ? "" : model.name;
</script>