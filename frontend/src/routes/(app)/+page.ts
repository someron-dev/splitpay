import { pb, type User } from "$lib/pocketbase";
import { getCurrentUser } from "$lib/pocketbase/authentication";

export async function load({ params }) {
    const users = await pb.collection("users")
        .getFullList({ filter: `(id != '${getCurrentUser()!.id}')` }) as User[];

    return {
        users,
    };
}