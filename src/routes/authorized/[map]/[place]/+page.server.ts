import { prisma } from 'lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	let place = await prisma.place.findFirst({
		where: {
			map: {
				name: params.map
			},
			name: params.place
		},
		include: {
			Mission: {
				include: {
					completedAlpha: true,
					completedBeta: true,
					completedGamma: true
				},
				orderBy: {
					id: 'asc'
				}
			}
		}
	});
	return {
		data: place,
		map: params.map,
		place: params.place
	};
};
