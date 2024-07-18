import { writable } from 'svelte/store';

interface AuthState {
	token: string | null;
	user: User | null;
}

interface User {
	username: string;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		token: null,
		user: null
	});

	return {
		subscribe,
		login: (token: string, user: User) => set({ token, user }),
		logout: () => set({ token: null, user: null }),
		setToken: (token: string) => update((auth) => ({ ...auth, token }))
	};
}

export const auth = createAuthStore();
