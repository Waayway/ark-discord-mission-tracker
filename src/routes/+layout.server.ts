import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals}) => {
    let session = await locals.getSession();

    return {
        session: session
    }
};