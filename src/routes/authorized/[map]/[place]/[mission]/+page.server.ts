import { prisma } from 'lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const mission = await prisma.mission.findFirst({
		where: {
			place: {
				name: params.place,
				map: {
					name: params.map
				}
			},
			title: params.mission
		}
	});
	return {
		data: mission,
		map: params.map,
		place: params.place,
		mission: params.mission
	};
};
