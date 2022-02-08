import { writable } from "svelte/store";
import { DEFAULT_USER } from "../constants";

export interface IUsers {
	email: string;
	password: string;
}

export const UsersStore = writable([DEFAULT_USER]);
