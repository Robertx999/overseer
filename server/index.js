import { WebSocketServer } from 'ws';
import PocketBase from 'pocketbase';
import 'dotenv/config';

const ws_port = process.env.WEB_SOCKET_PORT;
const pb_url = process.env.POCKETBASE_URL;

const pb = new PocketBase(pb_url);

const wsServer = new WebSocketServer({ port: ws_port });

wsServer.on('connection', (socket, req) => {
	let mac = '';

	socket.on('message', async (message) => {
		let header = message.slice(0, 3).toString();
		switch (header) {
			case 'mac':
				mac = message.slice(3).toString();
				await pb.collection('cameras').create({ mac: mac, online: true });
				console.log(mac);
				break;
			default:
				if (/^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/.test(mac)) {
					const camera_id = await pb.collection('cameras').getFirstListItem(`mac="${mac}"`);

					let payload = new FormData();
					payload.append('image', new Blob([message]));
					payload.append('camera_id', camera_id);
					payload.append('unix_timestamp', Date.now());

					await pb.collection('images').create(payload);
					// let dirPath = uploadsDir + mac.replaceAll(':', '') + '/';
					// fs.mkdir(dirPath, { recursive: true }, (err) => {
					// 	if (err) throw err;
					// });
					// fs.writeFile(
					// 	dirPath + Date.now() + '.jpg',
					// 	message,
					// 	{ encoding: 'binary', flag: 'w' },
					// 	(err) => {
					// 		if (err) throw err;
					// 		// console.log('File saved.');
					// 	}
					// );
				} else {
					socket.send('mac');
				}
		}
	});

	socket.send('mac');
	socket.send('pic');
	setInterval(
		() => {
			socket.send('pic');
		},
		60 * 60 * 1000
	);
});
