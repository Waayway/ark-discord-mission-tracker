import { PrismaClientValidationError } from '@prisma/client/runtime';
import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from 'lib/prisma';

export const POST: RequestHandler = async ({ request, locals, params }) => {
	let name = await request.text();
	// * Only while debugging
	// return json({
	// 	name: name
	// });

	try {
		let data = prisma.map.create({
			data: {
				name: name
			}
		});
		return json({
			name: name
		});
	} catch (error: any) {
		if (error.instanceof(PrismaClientValidationError)) {
			return json({
				data: 'error',
				error: 'Already Created'
			});
		}
		return json({
			data: 'error',
			error: 'idk'
		});
	}
};
