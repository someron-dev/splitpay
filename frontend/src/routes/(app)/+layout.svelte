<script lang="ts">
    import "@picocss/pico/css/pico.css";
    import { logout } from "$lib/pocketbase/authentication";
    import { goto } from "$app/navigation";

    function signOut() {
        logout();
        goto("/login");
    }
</script>

<header>
    <button on:click={signOut}>Logout</button>
</header>
<main class="container">
    <slot />
</main>
<footer></footer>