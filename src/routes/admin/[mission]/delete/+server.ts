import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { prisma } from 'lib/prisma';

export const DELETE: RequestHandler = async ({ params, request }) => {
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
		let db_data = await prisma.mission.delete({
			where: {
				id: mis_id.id
			}
		});
		return json({
			message: 'Mission has been deleted succesfully'
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
