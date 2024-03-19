import { json, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { maxCards } from '$lib/globals.js';

export async function POST(event) {
	const body = await event.request.json();
	const res = await event.fetch('/api/validateAnswer', {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain'
		},
		body: JSON.stringify({ decodedText: body.answer })
	});

	const session = await event.locals.getSession();
	if (!session) {
		redirect(303, '/login');
	}

	const user = session?.user;

	const {
		isValid,
		cardNumber,
		isAlreadyClaimed
	}: { isValid: boolean; cardNumber: number; isAlreadyClaimed: boolean } = await res.json();

	if (!isValid || isAlreadyClaimed) {
		return json({ isCardClaimed: false });
	}

	const post = user?.email
		? await prisma.card.create({
				data: {
					cardNumber: cardNumber,
					User: { connect: { email: user.email } }
				}
		  })
		: null;

	if (!post) {
		return json({ isCardClaimed: false });
	}

	const userCards = (await (await event.fetch('/api/getUserCards')).json()).cards;

	if (!userCards) {
		return json({ isCardClaimed: false });
	}

	const isFirstCard = userCards?.length === 1;
	const isLastCard = userCards?.length === maxCards;

	const userUpdate = await prisma.user.update({
		where: {
			id: post.userId!
		},
		data: {
			firstCard: isFirstCard ? new Date() : null,
			lastCard: isLastCard ? new Date() : null
		}
	});

	if (!post || !userUpdate) {
		return json({ isCardClaimed: false });
	}

	return json({
		isCardClaimed: true
	});
}
