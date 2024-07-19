<script lang="ts">
	import type { TableRow } from './Types/types';
	import { rowsReady } from './Stores/stores';

	export let row: TableRow;

	const channelNames = ['РР', 'РД', 'РБ', 'Син', 'Ком', 'Фан', 'МЗК', 'НСТ'];

	function check() {
		const isRowReady =
			row.announceDate.length > 0 && row.announcementName.length > 0 && row.channelName.length > 0;
		rowsReady.set(isRowReady);

		if ($rowsReady) {
			rowsReady.update((_) => true);
			console.log(row.number + ' rows ready');
		} else {
			rowsReady.update((_) => false);
			console.log(row.number + ' row not ready');
		}
	}
</script>

<tr>
	<td class=""
		><input
			bind:value={row.number}
			readonly
			class="{row.tableBg} w-full h-full p-2 focus:outline-none"
		/></td
	>
	<td class="">
		<select
			placeholder="Канал"
			bind:value={row.channelName}
			on:change={check}
			class="{row.tableBg} w-full h-full p-2 focus:outline-none"
		>
			{#each channelNames as dropdownName}
				<option value={dropdownName}>{dropdownName}</option>
			{/each}
		</select>
	</td>
	<td class=""
		><input
			placeholder="Название анонса"
			bind:value={row.announcementName}
			on:change={check}
			class="{row.tableBg} w-full h-full p-2 focus:outline-none"
		/></td
	>
	<td class=""
		><input
			placeholder="Дата окончания показа"
			bind:value={row.announceDate}
			on:change={check}
			class="{row.tableBg} w-full h-full p-2 focus:outline-none"
		/></td
	>
</tr>
