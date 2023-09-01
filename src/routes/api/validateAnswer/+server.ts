import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

const answers = [
	'50nWxBM821QYnHIzC2rdsPbB0JRLKh', // cafeteria - 0
	'answer1',
	'answer2',
	'answer3',
	'answer4'
];

export async function POST(event) {
	const body = await event.request.json();
	const invalidResponse = json({ isValid: false, cardNumber: undefined });

	const session = await event.locals.getSession();
	const user = session?.user;
	if (!user) {
		return invalidResponse;
	}

	const cardNumber = answers.indexOf(body.decodedText);
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
			isValid: false,
			isAlreadyFound: true,
			cardNumber: undefined
		});
	}

	const post = await prisma.card.create({
		data: {
			cardNumber: cardNumber,
			User: { connect: { email: user.email! } }
		}
	});

	if (!post) {
		return invalidResponse;
	}

	return json({
		isValid: true,
		cardNumber: cardNumber
	});
}
