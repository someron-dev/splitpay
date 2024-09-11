<script lang="ts">
    import "@picocss/pico/css/pico.css";
    import "@picocss/pico/css/pico.colors.css";
    import { logout } from "$lib/pocketbase/authentication";
    import { goto } from "$app/navigation";

    function signOut() {
        logout();
        goto("/login");
    }
</script>

<header>
    <nav class="navbar">
        <ul>
            <li><a href="/">Home</a></li>
        </ul>

        <ul>
            <li><strong>splitpay</strong></li>
        </ul>

        <ul>
            <li>
                <details class="dropdown">
                    <summary role="link">
                        Account
                    </summary>
                    <ul dir="rtl">
                        <li><a href="/settings">Settings</a></li>
                        <li><a href="#logout" on:click={signOut}>Logout</a></li>
                    </ul>
                </details>
            </li>
        </ul>
    </nav>
</header>
<main class="container">
    <slot />
</main>
<footer></footer>

<style>
    .navbar {
        padding-left: 1rem;
        padding-right: 1rem;
    }
</style>