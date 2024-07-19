<script>
	import { tableRows, createRow, rowsReady } from './Stores/stores';

	function AddRow() {
		let length = $tableRows.length;
		let color = length % 2 === 0 ? 'bg-slate-200' : 'bg-gray-300';

		tableRows.update((rows) => [...rows, createRow(length + 1, color)]);
		rowsReady.update((_) => false);
	}

	function RemoveRow() {
		if ($tableRows.length > 1) {
			rowsReady.update;
			tableRows.update((rows) => rows.slice(0, -1));
		}
	}
</script>

<div>
	<button
		on:click={RemoveRow}
		class="bg-red-500 hover:bg-red-400 font-mono text-xl pb-1 pt-1 pr-2 pl-2 border-4 border-black"
		>-</button
	>
	<button
		on:click={AddRow}
		class="bg-green-500 hover:bg-green-400 font-mono text-xl pb-1 pt-1 pr-2 pl-2 border-4 border-black"
		>+</button
	>
</div>
