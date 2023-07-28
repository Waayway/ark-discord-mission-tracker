import { prisma } from 'lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		let map_data = await prisma.map.findMany({
			include: {
				Places: {
					include: {
						Mission: true
					}
				}
			}
		});
		return {
			maps: map_data
		};
	} catch (e) {}
};
