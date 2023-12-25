import { prisma } from "lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    try {
        let data = await prisma.map.findMany({
            include: {
                Places: {
                    include: {
                        Mission: {
                            include: {
                                completedAlpha: true,
                                completedBeta: true,
                                completedGamma: true,
                            }
                        }
                    }
                }
            }
        });

        const maps: {
            name: string,
            alpha: number,
            beta: number,
            gamma: number,
            total_missions: number,
        }[] = data.map((map) => {
            const missions = map.Places.map((place) => place.Mission).flat();

            const alpha = missions.filter((mission) => mission.completedAlpha != null).length;
            const beta = missions.filter((mission) => mission.completedBeta != null).length;
            const gamma = missions.filter((mission) => mission.completedGamma != null).length;
            const total_missions = missions.length * 3;

            return {
                name: map.name,
                alpha,
                beta,
                gamma,
                total_missions,
            }
        });

        return {
            page_data: maps,
        }
    } catch (e) {
        console.log(e); 
        return;
    }
};