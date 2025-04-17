import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	// hapus cookies session
	cookies.delete('session', { path: '/' });
	console.log('Cookies deleted');

	// redirect ke halaman homepage
	throw redirect(302, '/login');
};
