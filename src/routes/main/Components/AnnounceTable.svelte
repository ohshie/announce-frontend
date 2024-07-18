<script lang="ts">
	import { tableRows } from "./Stores/stores.ts";
	import TableRow from "./TableRow.svelte";
</script>

<table class="w-full table-fixed border-separate border-4 border-black bg-black">

    <thead class="font-mono text-xl">
        <th class="bg-yellow-300 w-1/12 p-4">№</th>
        <th class="bg-yellow-300 w-1/12 p-4">Канал</th>
        <th class="bg-yellow-300 w-1/4 p-4">Название</th>
        <th class="bg-yellow-300 w-1/6 p-4">Дата</th>
    </thead>

    <tbody>
        {#each $tableRows as row (row.number)}
            <TableRow {row} />
        {/each}
    </tbody>
    
</table>