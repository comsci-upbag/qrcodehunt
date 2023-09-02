import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const slug = event.params.slug;
	const res = await fetch('/api/validateAnswer', {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain'
		},
		body: JSON.stringify({ slug })
	});

	const { isValid, cardNumber }: { isValid: boolean; cardNumber: number } = await res.json();

	return { isValid, cardNumber };
};
