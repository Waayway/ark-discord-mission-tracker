import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals,parent }) => {
	if ((await parent()).session) {
		throw redirect(303, "/authorized")
	}
	return {
	};
};
