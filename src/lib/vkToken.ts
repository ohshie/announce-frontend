import type { AuthState } from '$lib/auth';

async function CheckVkToken(auth: AuthState): Promise<boolean> {
	const endpoint = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CHECKTOKEN;
	console.log(`Attempting to check saved VkToken ${auth.token}`);

	try {
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: { Authorization: `Bearer ${auth.token}`, 'Content-type': 'application/json' }
		});
		if (response.ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error('Something went horribly wrong attempting to check Vk Token', error);
		return false;
	}
}

export default CheckVkToken;
