import { isLoggedIn } from "$lib/authentication";
import { redirect } from "@sveltejs/kit";

export async function load() {
    if(!isLoggedIn()) {
        throw redirect(307, '/login');
    }
}
