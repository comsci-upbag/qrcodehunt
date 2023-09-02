import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const res = await event.fetch('/api/getUserCards');
	const userCards = await res.json();
	return {
		session: await event.locals.getSession(),
		totalCardsCollected: userCards.cards.length
	};
};
