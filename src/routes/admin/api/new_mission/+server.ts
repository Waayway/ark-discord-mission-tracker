import { prisma } from 'lib/prisma';
import { IconsList } from 'lib/types';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

const schema = z.object({
	name: z.string(),
	explanation: z.string(),
	icon: z.enum(IconsList),
	place_id: z.number(),
	single: z.boolean()
});

export const POST: RequestHandler = async ({ request, locals, params }) => {
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
		let db_data = await prisma.mission.create({
			data: {
				explanation: data.explanation,
				icon: data.icon,
				title: data.name,
				placeId: data.place_id,
				single: data.single ?? false,
			}
		});
		return json({
			message: 'Mission has been created succesfully'
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
