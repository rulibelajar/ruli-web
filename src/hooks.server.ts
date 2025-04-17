import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Cek apakah cookie session ada
	const session = event.cookies.get('session');

	if (session) {
		try {
			// Jika ada, simpan user dalam locals
			event.locals.user = JSON.parse(session);
		} catch {
			event.locals.user = null;
		}
	} else {
		// Jika tidak ada session (setelah logout), set locals.user ke null
		event.locals.user = null;
	}

	// Resolusi request dan lanjutkan
	return resolve(event);
};
