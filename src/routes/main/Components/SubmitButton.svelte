<script lang="ts">
	import { tokenReady, rowsReady, tableRows } from './Stores/stores';
	import type { AuthState } from '$lib/auth';
	import submitData from '$lib/submitData';

	rowsReady.subscribe;

	$: buttonText = $tokenReady ? 'Создать анонсы' : 'Проверь доступ в вк!';
	$: disabled = !$rowsReady && buttonText != 'Создать анонсы';

	async function submit() {
		const storedAuth = localStorage.getItem('auth');
		var auth: AuthState = storedAuth ? JSON.parse(storedAuth) : { token: null, user: null };

		await submitData(auth, $tableRows);
	}
</script>

<button
	on:click={submit}
	{disabled}
	class="disabled:bg-gray-900 bg-green-500
p-6
border-4 border-black
font-mono font-extrabold
text-2xl text-black disabled:text-white
enabled:hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)]
transition duration-100"
>
	{buttonText}
</button>
