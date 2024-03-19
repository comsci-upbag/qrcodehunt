import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { maxCards } from '$lib/globals';

export const load: PageServerLoad = async (event) => {
	const res = await event.fetch('/api/getUserCards');
	const userCards = await res.json();
	const slug = event.params.slug;

	const validateRes = await event.fetch('/api/validateAnswer', {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain'
		},
		body: JSON.stringify({ decodedText: slug })
	});
	const { isValid, cardNumber, isAlreadyClaimed } = await validateRes.json();

	if (!isValid) throw redirect(303, '/');

	const cards: number[] = userCards.cards;

	return {
		session: await event.locals.getSession(),
		totalCardsCollected: userCards.cards.length,
		maxCards,
		slug,
		isValid,
		cardNumber,
		isAlreadyClaimed,
		userCards: cards
	};
};
