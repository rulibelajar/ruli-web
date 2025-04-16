import adapter from '@sveltejs/adapter-netlify'; // Ganti dengan adapter-netlify
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter() // Menggunakan adapter untuk Netlify
	}
};

export default config;
