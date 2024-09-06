import { redirect } from "@sveltejs/kit";
import { isLoggedIn } from "$lib/pocketbase/authentication";

export function load() {
    if(isLoggedIn()) {
        throw redirect(307, "/");
    }
}