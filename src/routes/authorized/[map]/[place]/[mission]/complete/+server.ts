import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from 'lib/prisma';
import { capitalizeFirstCharacter } from 'lib/utils';

export const POST: RequestHandler = async ({ request, locals, params }) => {
	let difficulty = await request.text();
	let sess = await locals.getSession();
	try {
		let get_mission = await prisma.mission.findFirst({
			where: {
				title: params.mission,
				place: {
					name: params.place,
					map: {
						name: params.map
					}
				}
			}
		});
		if (!get_mission) {
			return new Response("Couldn't find that mission", {
				status: 404
			});
		}
		let which = 'completed' + capitalizeFirstCharacter(difficulty);
		let updated_mission = await prisma.mission.update({
			data: {
				[which]: {
					connect: {
						discord_id: locals.discord_id
					}
				}
			},
			where: {
				id: get_mission?.id
			}
		});
		if (updated_mission) {
			return new Response('Mission has been updated');
		}
		return new Response('Something went wrong', {
			status: 500
		});
	} catch (e) {
		console.log(e);
		return new Response('Something went wrong', {
			status: 500
		});
	}
};
