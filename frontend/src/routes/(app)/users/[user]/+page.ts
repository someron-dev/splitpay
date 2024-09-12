import { type Expense, pb, type User } from "$lib/pocketbase";
import { getCurrentUser } from "$lib/pocketbase/authentication";
import { add, type Dinero, dinero, multiply, allocate } from "dinero.js";
import { currency } from "$lib/currency";

export async function load({ params }) {
    const expenses = await pb.collection("expenses")
        .getFullList({
            sort: '-created',
            filter: `(sharedBy ~ '${params.user}' && sharedBy ~ '${getCurrentUser()!.id}')`
        }) as Expense[];

    const user = await pb.collection("users").getOne(params.user) as User;

    const totals: { [key: string]: Dinero<number> } = {};

    expenses.forEach(expense => {
        const amount = multiply(
            allocate(
                dinero({ amount: expense.amount, currency: currency(expense.currency) }),
                [1, expense.sharedBy.length - 1]
            )[0],
            expense.creator === user.id ? -1 : 1
        );

        if(expense.currency in totals) totals[expense.currency] = add(totals[expense.currency], amount);
        else totals[expense.currency] = amount;
    });

    return {
        expenses,
        user,
        totals: Object.entries(totals)
    };
}
