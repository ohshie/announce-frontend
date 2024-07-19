<script lang="ts">
	import { onMount } from 'svelte';
	import vkToken from '$lib/vkToken';
	import AddRemoveRows from './Components/AddRemoveRows.svelte';
	import AnnounceTable from './Components/AnnounceTable.svelte';
	import SubmitButton from './Components/SubmitButton.svelte';
	import VkToken from './Components/VkToken.svelte';
	import type { AuthState } from '$lib/auth';

	let vkTokenSuccess: boolean = false;

	onMount(() => {
		const storedAuth = localStorage.getItem('auth');
		var auth: AuthState = storedAuth ? JSON.parse(storedAuth) : { token: null, user: null };

		vkToken(auth).then((result) => {
			vkTokenSuccess = result;
		});
	});
</script>

<main class="pr-10 pl-10 flex flex-col justify-center gap-4">
	<section class="flex justify-center">
		<h1 class="text-3xl sm:text-8xl font-mono font-black">DTR Announce Maker</h1>
	</section>
	<section class="flex justify-between align-top gap-1">
		<AddRemoveRows />
		<VkToken {vkTokenSuccess} />
	</section>
	<section class="flex flex-col gap-2">
		<AnnounceTable />
	</section>
	<section class="flex justify-center">
		<SubmitButton />
	</section>
</main>
