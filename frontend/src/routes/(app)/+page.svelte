<h1>Hello, {account}!</h1>
<ul>
    {#each data.users as user}
        <li><a href="/users/{user.id}">{user.name}</a></li>
    {/each}
</ul>

<script lang="ts">
    import { getCurrentUser } from "$lib/pocketbase/authentication";

    let model = getCurrentUser();
    const account = model == null ? "" : model.name;

    export let data;
</script>
