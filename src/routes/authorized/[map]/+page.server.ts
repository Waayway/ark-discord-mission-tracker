import { prisma } from 'lib/prisma';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	let map = await prisma.map.findFirst({
		where: {
			name: params.map
		},
		include: {
			Places: {
				include: {
					Mission: true
				}
			}
		}
	});
	if (!map) {
		throw redirect(303, '/authorized');
	}

	let missions = await prisma.mission.findMany({
		where: {
			place: {
				mapId: map.id
			}
		},
		select: {
			title: true,
			icon: true,
			place: {
				select: {
					name: true,
				}
			}
		}
	});

	let placeStats: {
		[key: string]: {
			tot_missions: number;
			beta_missions_done: number;
			alpha_missions_done: number;
			gamma_missions_done: number;
			tot_singles: number;
			singles_missions_done: number;
		};
	} = {};
	map.Places.forEach((el) => {
		placeStats[el.name] = {
			tot_missions: 0,
			alpha_missions_done: 0,
			beta_missions_done: 0,
			gamma_missions_done: 0,
			tot_singles: 0,
			singles_missions_done: 0
		};
		el.Mission.forEach((mis) => {
			if (mis.single) {
				placeStats[el.name].tot_singles++;
				if (mis.userAlphaId) {
					placeStats[el.name].singles_missions_done++;
				}
				return;
			}
			placeStats[el.name].tot_missions += 3;
			if (mis.userAlphaId) {
				placeStats[el.name].alpha_missions_done++;
			}
			if (mis.userBetaId) {
				placeStats[el.name].beta_missions_done++;
			}
			if (mis.userGammaId) {
				placeStats[el.name].gamma_missions_done++;
			}
		});
	});
	return {
		map: map,
		missions: missions,
		place_stats: placeStats
	};
};
