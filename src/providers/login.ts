import { IUser } from "../store/user";
import { IUsers, UsersStore } from "../store/users";
//import { LOGIN_URL, AUTH_URL } from "../env";

let users = [] as Array<IUsers>;

UsersStore.subscribe(usersData => {
	users = usersData;
});

interface ILogin {
	logged: boolean;
	jwt: string;
	user: IUser;
	error: string;
}

export function login(email: string, password: string): Promise<ILogin> {
	const filtered = users.filter(user => user.email === email && user.password === password);

	if (filtered.length === 1) {
		return Promise.resolve({
			logged: true,
			jwt: email,
			user: {
				email,
			},
			error: "",
		});
	}

	return Promise.resolve({
		logged: false,
		jwt: "",
		user: {
			email: "",
		},
		error: "Wrong password",
	});
}

export function auth(jwt: string): Promise<ILogin> {
	const email = jwt;
	const filtered = users.filter(user => user.email === email);

	if (filtered.length === 1) {
		return Promise.resolve({
			logged: true,
			jwt: email,
			user: {
				email,
			},
			error: "",
		});
	}

	return Promise.resolve({
		logged: false,
		jwt: "",
		user: {
			email: "",
		},
		error: "Not authorized!",
	});
}
