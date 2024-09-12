<h1>Settings</h1>

<article>
    <label for="displayname">Display name</label>
    <div role="group">
        <input
                id="displayname"
                type="text"
                aria-describedby="displayname-error"
                aria-invalid={!displaynameError ? null : true}
                bind:value={displayname}
        >
        {#await saveDisplaynameProgress}
            <button aria-busy="true"></button>
        {:then value}
            <button on:click={saveDisplayname}>Save</button>
        {/await}
    </div>
</article>

<article>
    <header><h2>Change your password</h2></header>
    <form on:submit|preventDefault={changePassword}>
        <label>
            Old Password
            <input
                    type="password"
                    aria-describedby="old-password-error"
                    aria-invalid={!!passwordError.oldPassword ? true : null}
                    bind:value={oldPassword}
            >
            <small id="old-password-error">{!!passwordError.oldPassword ? passwordError.oldPassword.message : ""}</small>
        </label>
        <label>
            New Password
            <input
                    type="password"
                    aria-describedby="password-error"
                    aria-invalid={!!passwordError.password ? true : null}
                    bind:value={newPassword}
            >
            <small id="password-error">{!!passwordError.password ? passwordError.password.message : ""}</small>
        </label>
        <label>
            Repeat Password
            <input
                    type="password"
                    aria-describedby="password-confirm-error"
                    aria-invalid={!!passwordError.passwordConfirm ? true : null}
                    bind:value={passwordConfirm}
            >
            <small id="password-confirm-error">{!!passwordError.passwordConfirm ? passwordError.passwordConfirm.message : ""}</small>
        </label>
        <button type="submit">Save</button>
    </form>
</article>

<script lang="ts">
    import { pb } from "$lib/pocketbase";

    export let data;

    let displayname = data.user.name;
    let saveDisplaynameProgress: Promise<unknown>;
    let displaynameError: string;

    function saveDisplayname() {
        saveDisplaynameProgress = pb.collection("users").update(data.user.id, { name: displayname })
            .catch(e => displaynameError = e);
    }

    let oldPassword = "";
    let newPassword = "";
    let passwordConfirm = "";
    let passwordError: PasswordError = {};

    type Part = {
        code: string;
        message: string;
    }

    type PasswordError = {
        oldPassword?: Part;
        password?: Part;
        passwordConfirm?: Part;
    }

    function changePassword() {
        pb.collection("users").update(data.user.id, {
            oldPassword: oldPassword,
            password: newPassword,
            passwordConfirm: passwordConfirm,
        })
            .then(() => passwordError = {})
            .catch(e => passwordError = e.response.data)
    }
</script>
