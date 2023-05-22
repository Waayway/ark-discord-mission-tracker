import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { DISCORD_ID, DISCORD_SECRET } from '$env/static/private';
import { env } from '$env/dynamic/private';
import { prisma } from 'lib/prisma';

export const handle = SvelteKitAuth(async (event) => {
	const authOptions: SvelteKitAuthConfig = {
		callbacks: {
			session: async (ev) => {
				event.locals.discord_id = ev.token.sub ?? '';
				return ev.session;
			},
			signIn: async (ev) => {
				if (!ev.account?.access_token) {
					return false;
				}
				const guilds = await (
					await fetch('https://discord.com/api/v10/users/@me/guilds', {
						headers: {
							Authorization: 'Bearer ' + ev.account.access_token
						}
					})
				).json();

				let success = false;
				for (let i = 0; i < guilds.length; ++i) {
					const e = guilds[i];
					if (Object.keys(e).includes('id')) {
						if (e.id == env.TARGET_SERVER) {
							success = true;
							break;
						}
					}
				}
				if (success) {
					if (!ev.user || !ev.user.image || !ev.user.name) {
						return false;
					}
					try {
						let i = await prisma.user.count({
							where: {
								discord_id: ev.account.providerAccountId
							}
						});
						if (i < 1) {
							await prisma.user.create({
								data: {
									discord_id: ev.account.providerAccountId,
									img: ev.user.image,
									username: ev.user.name
								}
							});
						}
					} catch (e) {
						console.log(e);
						return false;
					}
					event.locals.discord_id = ev.account.providerAccountId;
				}
				return success;
			}
		},
		providers: [
			Discord({
				clientId: DISCORD_ID,
				clientSecret: DISCORD_SECRET,
				authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds'
			})
		],
		trustHost: true,
		secret: env.AUTH_SECRET
	};
	return authOptions;
});
