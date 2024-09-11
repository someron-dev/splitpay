import { type Expense, pb, type User } from "$lib/pocketbase";
import { getCurrentUser } from "$lib/pocketbase/authentication";

export async function load({ params }) {
    const expenses = await pb.collection("expenses")
        .getFullList({
            sort: '-created',
            filter: `(sharedBy ~ '${params.user}' && sharedBy ~ '${getCurrentUser()!.id}')`
        }) as Expense[];

    const user = await pb.collection("users").getOne(params.user) as User;

    return {
        expenses,
        user
    };
}
