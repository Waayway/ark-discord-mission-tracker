import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	let session = await locals.getSession();
	if (session?.user?.email != env.ADMIN_DISCORD_EMAIL) {
		throw redirect(303, '/');
	}

	return {};
};
