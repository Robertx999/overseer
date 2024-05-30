import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import eventsource from 'eventsource';
import 'dotenv/config';

const pb_url = process.env.POCKETBASE_URL;

export const handle: Handle = async ({ event, resolve }) => {
	(event.locals as { pb: PocketBase }).pb = new PocketBase(pb_url);

	global.EventSource = eventsource as unknown as {
		new (url: string | URL, eventSourceInitDict?: EventSourceInit | undefined): EventSource;
		prototype: EventSource;
		readonly CONNECTING: 0;
		readonly OPEN: 1;
		readonly CLOSED: 2;
	};

	const response = await resolve(event);

	return response;
};
