import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { prisma } from '$lib/server/prisma';

import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const redirects: Handle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();

	if (!event.url.pathname.startsWith('/login') && !session) {
		throw redirect(303, '/login');
	}

	return resolve(event);
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		trustHost: true,
		providers: [GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
		adapter: PrismaAdapter(prisma)
	}),
	redirects
);
