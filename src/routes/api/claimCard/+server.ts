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
				},
				include: {
					User: {
						include: {
							cards: true
						}
					}
				}
		  })
		: null;

	if (post && user?.email && post.User?.cards) {
		const userCards = post.User?.cards;

		const isFirstCard = userCards?.length === 1;
		const isLastCard = userCards?.length === maxCards;

		if (isFirstCard) {
			await prisma.user.update({
				where: {
					email: user.email
				},
				data: {
					firstCard: new Date()
				}
			});
		}

		if (isLastCard) {
			await prisma.user.update({
				where: {
					email: user.email
				},
				data: {
					lastCard: new Date()
				}
			});
		}
	}

	return json({
		isCardClaimed: true
	});
}
