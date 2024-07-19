<script lang="ts">
	import { tokenReady } from './Stores/stores';
	export let vkTokenSuccess: boolean;

	let readonly: boolean = false;
	let disabled: boolean = false;
	$: newVkToken = '';

	let buttonMessage = 'Проверить доступ к VK';

	$: if (vkTokenSuccess) {
		(disabled = true), (readonly = true);
		tokenReady.set(true);
		buttonMessage = '👍';
	}

	async function updateVkToken() {
		const storedAuth = localStorage.getItem('auth');
		const endpoint = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_UPDATETOKEN;

		const response = await fetch(endpoint, {
			method: 'POST',
			mode: 'cors',
			headers: { Authorization: `Bearer: ${storedAuth}`, 'content-type': 'application/json' },
			body: JSON.stringify(newVkToken)
		});

		if (response.ok) {
			disabled = true;
			readonly = true;
			tokenReady.set(true);
			buttonMessage = '👍';
		}
	}
</script>

<div class="flex gap-2">
	<input
		{readonly}
		class="border-2 border-black rounded-none
    focus:outline-none bg-slate-200 focus:bg-slate-300 focus:rounded-none"
		bind:value={newVkToken}
	/>

	<button
		{disabled}
		on:click={updateVkToken}
		class="p-2
    border-2 border-black
    bg-green-600
    font-bold
    enabled:hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)]
    text-xs sm:text-sm
    transition duration-100">{buttonMessage}</button
	>
</div>
