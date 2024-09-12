import { pb, type User } from "$lib/pocketbase";

export async function load() {
    const user = await pb.collection("users").getOne(pb.authStore.model!.id) as User;

    return {
        user
    };
}