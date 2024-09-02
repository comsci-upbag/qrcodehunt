import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	const users = await prisma.user.findMany({
		where: {
			// duration: {
			// 	not: null
			// },
			// firstCard: {
			// 	not: null
			// }
		},
		include: {
			cards: true
		}
	});

	users.sort((a, b) => {
		if (a.duration && b.duration) {
			return a.duration - b.duration;
		} else {
			if (a.cards.length > b.cards.length) {
				return -1;
			} else {
				return 0;
			}
		}
	});

	return {
		session: await event.locals.getSession(),
		users
	};
};
