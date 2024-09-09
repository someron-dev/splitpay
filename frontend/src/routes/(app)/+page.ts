import { type Expense, pb } from "$lib/pocketbase";

export async function load() {
    const expenses = await pb.collection("expenses").getFullList() as Expense[];

    return {
        expenses
    };
}