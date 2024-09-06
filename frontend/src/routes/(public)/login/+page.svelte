<div class="vertical-center">
    <form on:submit|preventDefault={handleSubmit}>
        <input
                type="email"
                bind:value={email}
                aria-invalid={emailInvalid ? true : null}
                name="email"
                placeholder="Email"
                aria-label="Email"
                autocomplete="email"
                aria-describedby="email-error"
        >
        {#if emailInvalid}
            <small id="email-error">
                Please enter a valid email address.
            </small>
        {/if}
        <input
                type="password"
                bind:this={passwordField}
                bind:value={password}
                aria-invalid={passwordError !== null ? true : null}
                name="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="password-error"
        >
        {#if passwordError !== null}
            <small id="password-error">
                {#if passwordError === "empty"}
                    Please enter a password.
                {:else}
                    The email or password you entered is incorrect.
                {/if}
            </small>
        {/if}
        <button type="submit">Login</button>
        <a href="/_/">
            <div role="button">Admin-Panel</div>
        </a>
    </form>
</div>

<script lang="ts">
    import { login } from "$lib/pocketbase/authentication";
    import { isEmpty, isEmail } from "validator";
    import { goto } from "$app/navigation";
    import type {ClientResponseError} from "pocketbase";

    let email = '';
    let password = '';
    let passwordField: HTMLInputElement;

    let emailInvalid = false;
    let passwordError: null | "empty" | "wrong" | "unknown" = null;

    function handleSubmit() {
        if(!isEmail(email) || isEmpty(password)) {
            emailInvalid = !isEmail(email);
            passwordError = isEmpty(password) ? "empty" : null;
            passwordField.value = "";
            return;
        }

        login({ email, password })
            .then(() => {
                goto("/");
            })
            .catch((err: ClientResponseError) => {
                if(err.message === "Failed to authenticate.") {
                    passwordError = "wrong";
                    passwordField.value = "";
                }
                else passwordError = "unknown";
            });
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
