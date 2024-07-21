<script lang="ts">
	import type { AuthState } from '$lib/auth';
	import { tokenReady } from './Stores/stores';

	export let vkTokenSuccess: boolean;

	let readonly: boolean = false;
	let disabled: boolean = false;
	let newVkToken = '';

	let buttonMessage = 'Проверить доступ к VK';

	$: if (vkTokenSuccess) {
		(disabled = true), (readonly = true);
		tokenReady.set(true);
		buttonMessage = '👍';
	}

	async function updateVkToken() {
		const storedAuth = localStorage.getItem('auth');
		var auth: AuthState = storedAuth ? JSON.parse(storedAuth) : { token: null, user: null };

		const endpoint = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_UPDATETOKEN;

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { Authorization: `Bearer ${auth.token}`, 'content-type': 'application/json' },
				body: JSON.stringify(newVkToken)
			});

			if (response.ok) {
				disabled = true;
				readonly = true;
				tokenReady.set(true);
				buttonMessage = '👍';
			} else {
				throw new Error('Failed to update token');
			}
		} catch (error) {
			console.error('Error updating VK token:', error);
		}
	}
</script>

<div class="flex gap-2">
	<form on:submit|preventDefault={updateVkToken}>
		<input
			{readonly}
			id="vk-token-input"
			type="text"
			class="border-2 border-black rounded-none
    focus:outline-none bg-slate-200 focus:bg-slate-300 focus:rounded-none"
			bind:value={newVkToken}
		/>

		<button
			{disabled}
			type="submit"
			class="p-2
    border-2 border-black
    bg-green-600
    font-bold
    enabled:hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)]
    text-xs sm:text-sm
    transition duration-100">{buttonMessage}</button
		>
	</form>
</div>
