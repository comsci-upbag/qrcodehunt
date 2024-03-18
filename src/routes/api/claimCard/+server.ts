import { json, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

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

	const post = user
		? await prisma.card.create({
				data: {
					cardNumber: cardNumber,
					User: { connect: { email: user.email! } }
				}
		  })
		: null;

	if (!post) {
		return json({ isCardClaimed: false });
	}

	return json({
		isCardClaimed: true
	});
}
