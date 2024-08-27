import { pb } from "$lib/pocketbase";
import { goto } from "$app/navigation";

export async function ensureAuthentication() {
    if (!pb.authStore.isValid) {
        await goto("/login");
    }
}

export function getCurrentUser() {
    return pb.authStore.model;
}

export function isLoggedIn() {
    return pb.authStore.isValid;
}