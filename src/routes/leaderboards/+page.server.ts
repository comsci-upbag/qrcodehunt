import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	const users = await prisma.user.findMany({
		where: {
			duration: {
				not: null
			}
		}
	});

	users.sort((a, b) => {
		if (a.duration && b.duration) {
			return a.duration - b.duration;
		} else {
			return 0;
		}
	});

	return {
		session: await event.locals.getSession(),
		users
	};
};
