import { type Expense, pb } from "$lib/pocketbase";

export async function load() {
    const expenses = await pb.collection("expenses")
        .getFullList({ sort: '-created' }) as Expense[];

    return {
        expenses
    };
}