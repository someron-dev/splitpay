import { pb, type OtherUser } from "$lib/pocketbase";
import { getCurrentUser } from "$lib/pocketbase/authentication";

export async function load({ params }) {
    const users = await pb.collection("other_users")
        .getFullList({ filter: `(id != '${getCurrentUser()!.id}')` }) as OtherUser[];

    return {
        users,
    };
}