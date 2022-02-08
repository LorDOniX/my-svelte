import { writable } from "svelte/store";

export interface IUser {
	email: string;
}

export const UserStore = writable({
	email: "",
});
