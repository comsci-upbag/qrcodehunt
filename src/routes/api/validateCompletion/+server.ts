import { json, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export const GET = async (event) => {
  const session = await event.locals.getSession();
  const user = session?.user;
  if (!user) {
    throw redirect(303, '/login');
  }
  const userCards = await prisma.card.findMany({
    where: {
      User: {
        email: user.email
      }
    }
  });

  if (userCards.length == 2) {
    throw redirect(303, 'http://www.google.com/');
  }

  return json(false);
};
