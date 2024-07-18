<script lang="ts">
	import { auth } from '$lib/auth';
	import { goto } from '$app/navigation';

	interface authResponse {
		token: string;
		user: {
			id: number;
			username: string;
		};
	}

	let username = '';
	let password = '';

	const requestUrl = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_AUTH;

	async function handleLogin() {
		try {
			console.log('Attempting login for user:', username);
			console.log('Request URL:', requestUrl);

			const response = await fetch(requestUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			if (response.ok) {
				const data: authResponse = await response.json();
				console.log('Fetched jwt token for ${username}');
				auth.login(data.token, data.user);

				goto('/main');
			} else {
				throw new Error('Login failed');
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	}
</script>

<form class="flex flex-col max-w-sm mx-auto gap-2" on:submit|preventDefault={handleLogin}>
	<div class="flex flex-col gap-2">
		<div class="flex flex-row gap-2 items-center">
			<label class="w-1/4 pr-2" for="username">Username:</label>
			<input class="w-3/4" type="text" id="username" bind:value={username} required />
		</div>
		<div class="flex flex-row gap-2 items-center">
			<label class="w-1/4 pr-2" for="password">Password:</label>
			<input class="w-3/4" type="password" id="password" bind:value={password} required />
		</div>
	</div>
	<button class="bg-green-400 border-4 border-black" type="submit"> Login </button>
</form>
