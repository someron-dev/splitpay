<div class="vertical-center">
    <form on:submit|preventDefault={handleSubmit}>
        <input type="email" bind:value={email} name="email" placeholder="Email" aria-label="Email" autocomplete="email">
        <input type="password" bind:value={password} name="password" placeholder="Password" aria-label="Password">
        <button type="submit">Login</button>
    </form>
</div>

<script lang="ts">
    import {login} from "$lib/authentication";

    let email = '';
    let password = '';

    function handleSubmit() {
        login({ email, password})
    }
</script>

<style>
    .vertical-center {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>
