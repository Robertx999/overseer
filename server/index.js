import { WebSocketServer } from 'ws';
import PocketBase from 'pocketbase';
import 'dotenv/config';

const ws_port = process.env.WEBSOCKET_PORT;
const pb_url = process.env.WEB_POCKETBASE_URL;

const pb = new PocketBase(pb_url);

const wsServer = new WebSocketServer({ port: ws_port });

wsServer.on('connection', (socket, req) => {
	let mac = '';
	let id = '';
	let alive = true;

	socket.on('message', async (message) => {
		alive = true;
		let header = message.slice(0, 3).toString();
		switch (header) {
			case 'mac':
				mac = message.slice(3).toString();
				console.log(`${mac} connected`);
				await pb
					.collection('cameras')
					.getFirstListItem(`mac="${mac}"`)
					.then(async (res) => {
						({ id } = await pb.collection('cameras').update(res.id, { mac: mac, online: true }));
					})
					.catch(async () => {
						({ id } = await pb.collection('cameras').create({ mac: mac, online: true }));
					});
				break;
			default:
				if (/^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/.test(mac)) {
					let payload = new FormData();
					payload.append('image', new Blob([message]));
					payload.append('camera_id', id);
					payload.append('unix_timestamp', Date.now());

					await pb.collection('images').create(payload);
				} else {
					socket.send('mac');
				}
		}
	});

	socket.on('pong', () => {
		alive = true;
	});

	socket.on('close', async () => {
		console.log(`${mac} closed`);
		await pb.collection('cameras').update(id, { mac: mac, online: false });
	});

	socket.send('mac');
	socket.send('pic');
	setInterval(() => {
		if (alive == false) return socket.terminate();

		alive = false;
		socket.ping();
	}, 10000);
	setInterval(
		() => {
			socket.send('pic');
		},
		60 * 60 * 1000
	);
});
