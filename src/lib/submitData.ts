import type { TableRow } from '../routes/main/Components/Types/types';
import type { AuthState } from './auth';

async function submitData(auth: AuthState, tableRows: TableRow[]): Promise<boolean> {
	const endPoint = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_SUBMIT;

	console.log('Sending data');

	try {
		const response = await fetch(endPoint, {
			method: 'POST',
			headers: { Authorization: `Bearer ${auth.token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(tableRows)
		});

		if (response.ok) {
			console.log('ok');
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log('Something awful happened while trying to submit announces', error);
		return false;
	}
}

export default submitData;
