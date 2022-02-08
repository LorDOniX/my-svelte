<script type="ts">
	import { trans } from '../util/trans';
	import { setJWT } from '../util/utils';
	import { UserStore } from "../store/user";
	import { UsersStore } from "../store/users";
	import { navigate } from "svelte-routing";

	let email = "";
	let password = "";
	let emailError = "";
	let passwordError = "";
	let sendError = "";

	function handleSubmit() {
		emailError = "";
		passwordError = "";
		sendError = "";

		if (email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/iu) === null) {
			emailError = email ? trans("Email není ve správném formátu!") : trans("Email je povinný!");
		}

		if (!password) {
			passwordError = trans("Heslo je povinné!");
		}

		if (!emailError && !passwordError) {
			setJWT(email);
			UsersStore.update(users => [...users, {
				email,
				password,
			}]);
			UserStore.update(userData => Object.assign(userData, {
				email,
			}));
			navigate("/user");
		}
	}
</script>

<div class="registerPage">
	<form on:submit|preventDefault={handleSubmit}>
		<h1>{trans("Registrace")}</h1>
		<div>
			<label>
				{trans("Email")}:
				<input type="text" placeholder={trans("email")} bind:value={email} />
				<p class="errors">
					{emailError}
				</p>
			</label>
		</div>
		<div>
			<label>
				{trans("Heslo")}:
				<input type="password" placeholder={trans("heslo")} bind:value={password} />
				<p class="errors">
					{passwordError}
				</p>
			</label>
		</div>
		<div>
			<button type="submit">{trans("Vytvořit účet")}</button>
		</div>
		<p>{ sendError }</p>
	</form>
</div>
