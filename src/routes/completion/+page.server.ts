import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { maxCards } from '$lib/globals';

export const load: PageServerLoad = async (event) => {
	const res = await event.fetch('/api/getUserCards');
	const userCards = await res.json();

	if (userCards.cards.length != maxCards) {
		throw redirect(303, '/');
	}

	return {
		session: await event.locals.getSession()
	};
};
