import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function POST(event) {
	const body = await event.request.json();
	const res = await event.fetch('/api/validateAnswer',{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
		body: JSON.stringify( {decodedText: body.answer})
  });

	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(303, '/login');
	}

	const user = session.user;

  const { isValid, cardNumber }: { isValid: boolean; cardNumber: number } = await res.json();

  if (!isValid) {
    return json({ isCardClaimed: false });
  }

	const post = await prisma.card.create({
		data: {
			cardNumber: cardNumber,
			User: { connect: { email: user.email! } }
		}
	});

	if (!post) {
    return json({ isCardClaimed: false });
	}

	return json({
		isCardClaimed: true
	});
}
