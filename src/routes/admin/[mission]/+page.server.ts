import { prisma } from 'lib/prisma';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	let mis = await prisma.mission.findFirst({
		where: {
			title: params.mission
		},
		include: {
			completedAlpha: true,
			completedBeta: true,
			completedGamma: true,
			place: true
		}
	});
	let places = await prisma.place.findMany({});
	if (mis == null) {
		throw redirect(303, '/admin');
	}
	return {
		mission: mis,
		places: places
	};
};
