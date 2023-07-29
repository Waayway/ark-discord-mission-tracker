import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { prisma } from 'lib/prisma';

const schema = z.object({
	place_id: z.number(),
	title: z.string(),
	explanation: z.string()
});

export const POST: RequestHandler = async ({ params, request }) => {
	let json_data = await request.json();
	let result = await schema.safeParseAsync(json_data);
	if (!result.success) {
		return json(
			{
				error: result.error.cause
			},
			{ status: 422 }
		);
	}
	let data = result.data;
	try {
		let mis_id = await prisma.mission.findFirst({
			where: {
				title: params.mission
			}
		});
		if (mis_id == null) {
			return json(
				{
					error: 'Mission not found'
				},
				{ status: 404 }
			);
		}
		let db_data = await prisma.mission.update({
			where: {
				id: mis_id.id
			},
			data: {
				placeId: data.place_id,
				title: data.title,
				explanation: data.explanation
			}
		});
		return json({
			message: 'Mission has been updated succesfully'
		});
	} catch (error: any) {
		console.log(error);
		return json(
			{
				error: 'Internal server error'
			},
			{ status: 500 }
		);
	}
};
