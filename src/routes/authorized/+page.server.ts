import { prisma } from "lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    try {
        let data = await prisma.map.findMany({});
        return {
            page_data: data
        }
    } catch (e) {
        
    }
};