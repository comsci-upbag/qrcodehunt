import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { answers } from '$lib/server/answers';

export async function POST(event) {
	const body = await event.request.json();
	const invalidResponse = json({ isValid: false, cardNumber: undefined });

	const session = await event.locals.getSession();
	const user = session?.user;
	if (!user) {
		return invalidResponse;
	}

	const cardNumber =
		body.decodedText === 'https://qrcodehunt.vercel.app/K6PWhgUu3I'
			? answers.indexOf('K6PWhgUu3I')
			: answers.indexOf(body.decodedText);
	if (cardNumber == -1) {
		return invalidResponse;
	}

	const userCards = await prisma.card.findMany({
		where: {
			cardNumber: cardNumber,
			User: {
				email: user.email
			}
		}
	});

	if (userCards.length > 0) {
		return json({
			isValid: true,
			isAlreadyClaimed: true,
			cardNumber: cardNumber
		});
	}

	return json({
		isValid: true,
		cardNumber: cardNumber
	});
}
