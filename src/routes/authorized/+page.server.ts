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

            const single = missions.filter((mission) => mission.single).length;

            const alpha = missions.filter((mission) => mission.completedAlpha != null && !mission.single).length;
            const beta = missions.filter((mission) => mission.completedBeta != null).length;
            const gamma = missions.filter((mission) => mission.completedGamma != null).length;
            const completed_singles = missions.filter((mission) => mission.completedAlpha != null && mission.single).length;
            const total_missions = (missions.length - single) * 3;

            return {
                name: map.name,
                alpha,
                beta,
                gamma,
                total_missions,
                total_singles: single,
                singles: completed_singles
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