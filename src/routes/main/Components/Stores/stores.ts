import { writable } from 'svelte/store';

import type { TableRow } from '../Types/types';

export function createRow(count: number, color: string): TableRow {
	return {
		number: count,
		channelName: '',
		announcementName: '',
		announceDate: '',
		tableBg: color
	};
}

export const tableRows = writable([createRow(1, 'bg-slate-200')]);

export const vkToken = writable('');
export const tokenReady = writable(false);
export const rowsReady = writable(false);
