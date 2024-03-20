import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { maxCards } from '$lib/globals';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	const res = await event.fetch('/api/getUserCards');
	const userCards = await res.json();

	if (userCards.cards.length != maxCards) {
		throw redirect(303, '/');
	}

	const user = session?.user?.email
		? await prisma.user.findUnique({
				where: {
					email: session?.user?.email
				}
		  })
		: null;

	if (!user) {
		throw redirect(303, '/');
	}

	const updatedUser =
		user.lastCard && user.firstCard
			? await prisma.user.update({
					where: {
						email: user.email!
					},
					data: {
						duration: user.lastCard.getTime() - user.firstCard.getTime()
					}
			  })
			: null;

	if (!updatedUser?.duration) {
		return { session: await event.locals.getSession(), failure: true };
	}

	return {
		session: await event.locals.getSession()
	};
};
