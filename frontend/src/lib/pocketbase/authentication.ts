import { pb, type User } from "$lib/pocketbase";
import { goto } from "$app/navigation";
import type { RecordAuthResponse } from "pocketbase";

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

export function login(credentials: BasicCredentials): Promise<RecordAuthResponse<User>> {
    return pb.collection("users").authWithPassword(credentials.email, credentials.password);
}

export function logout() {
    pb.authStore.clear();
}

type BasicCredentials = {
    email: string;
    password: string;
};