<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { auth } from '$lib/auth.js';

	import Login from './Components/Login.svelte';

	onMount(() => {
		if (browser) {
			// Check for existing token in localStorage
			const storedAuth = localStorage.getItem('auth');
			if (storedAuth) {
				const { token, user } = JSON.parse(storedAuth);
				auth.login(token, user);
				goto('/main');
			}
		}
	});

	// Subscribe to auth store changes
	$: if (browser && $auth.token) {
		localStorage.setItem('auth', JSON.stringify($auth));
	} else if (browser) {
		localStorage.removeItem('auth');
	}
</script>

<main class="w-full h-screen">
	<div class="flex flex-col justify-center items-center h-screen gap-4">
		<span class="font-mono font-black text-3xl">DTR Announces</span>
		<Login />
	</div>
</main>
