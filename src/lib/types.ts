export type LayoutProps = object;

export const IconsList = [
	'race',
	'retrieval',
	'gather',
	'gauntlet',
	'fishing',
	'hunt',
	'basketball',
	'escort',
	'other'
] as const;
export type Icons = (typeof IconsList)[number] | undefined;

export const isValidIcon = (icon: string | undefined): Icons | undefined => {
	if (!icon) {
		return;
	}
	return icon as Icons;
};
