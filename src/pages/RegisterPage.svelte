<script type="ts">
	import { get } from 'svelte/store';
	import { _, translate } from 'svelte-intl';
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
			emailError = email ? get(translate)('loginPage.emailFormatError') : get(translate)("loginPage.emailRequiredError");
		}

		if (!password) {
			passwordError = get(translate)('loginPage.passwordRequiredError');
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
		<h1>{$_("registerPage.title")}</h1>
		<div>
			<label>
				{$_("registerPage.email")}:
				<input type="text" placeholder={$_("loginPage.email")} bind:value={email} />
				<p class="errors">
					{emailError}
				</p>
			</label>
		</div>
		<div>
			<label>
				{$_("registerPage.password")}:
				<input type="password" placeholder={$_("loginPage.password")} bind:value={password} />
				<p class="errors">
					{passwordError}
				</p>
			</label>
		</div>
		<div>
			<button type="submit">{$_("registerPage.createAccount")}</button>
		</div>
		<p>{ sendError }</p>
	</form>
</div>
