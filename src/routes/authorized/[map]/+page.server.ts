import { prisma } from "lib/prisma";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    let map = await prisma.map.findFirst({
        where: {
            name: params.map
        },
        include: {
            Places: true
        }
    });
    if (!map) {
        throw redirect(303, "/authorized")
    }
    return {
        map: map
    }
};