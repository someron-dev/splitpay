import { isLoggedIn } from "$lib/pocketbase/authentication";
import { redirect } from "@sveltejs/kit";

export async function load() {
    if(!isLoggedIn()) {
        throw redirect(307, '/login');
    }
}

export const ssr = false;
