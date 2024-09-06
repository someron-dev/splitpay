import PocketBase, { type RecordModel } from 'pocketbase';

import { PUBLIC_PB_URL } from '$env/static/public';

export const pb = new PocketBase(PUBLIC_PB_URL);

// Model types
export type User = RecordModel & {
    username: string;
    email: string;
    verified: boolean;
    emailVisibility: boolean;
    name: string;
    avatar: string;
};

export type Expense = RecordModel & {
    amount: number;
    subject: string;
    creator: string;
};
