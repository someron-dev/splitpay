<script>
    import { pb } from "\$lib/pocketbase";

    const { isAdmin, isValid, isAuthRecord } = pb.authStore;

    const authData = JSON.stringify({
        isValid, isAuthRecord, isAdmin
    })
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>whoami? {authData}</p>

<a href="/test">Test page</a>