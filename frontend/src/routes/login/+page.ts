import { redirect } from "@sveltejs/kit";
import { isLoggedIn } from "$lib/authentication";

export function load() {
    if(isLoggedIn()) {
        throw redirect(307, "/");
    }
}