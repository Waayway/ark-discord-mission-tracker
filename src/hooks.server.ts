import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { DISCORD_ID, DISCORD_SECRET } from '$env/static/private';
import { env } from '$env/dynamic/private';

export const handle = SvelteKitAuth({
	callbacks: {
		session: async (ev) => {
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
			return success;
		}
	},
	providers: [
		Discord({
			clientId: DISCORD_ID,
			clientSecret: DISCORD_SECRET,
			authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds'
		})
	]
});
