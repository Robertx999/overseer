import express from 'express';
import { createServer } from 'node:https';
import { WebSocketServer } from 'ws';
import fs from 'node:fs/promises';
import path from 'node:path';
import { handler } from '../build/handler.js';

////////////////////////// CONFIG //////////////////////////
const host = '';
const port = 81;
const ws_port = 3109;
const uploadsDir = './server/uploads/';

// const options = {
// 	key:
// }
////////////////////////////////////////////////////////////

const app = express();
const server = createServer(app);

const wsServer = new WebSocketServer({ port: ws_port });

wsServer.on('connection', (socket, req) => {
	let mac = '';
	socket.on('message', (message) => {
		let header = message.slice(0, 3).toString();
		if (header == 'mac') {
			mac = message.slice(3).toString();
			console.log(mac);
		} else if (/^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/.test(mac)) {
			let dirPath = uploadsDir + mac.replaceAll(':', '') + '/';
			fs.mkdir(dirPath, { recursive: true }, (err) => {
				if (err) throw err;
			});
			fs.writeFile(
				dirPath + '/' + Date.now() + '.jpg',
				message,
				{ encoding: 'binary', flag: 'w' },
				(err) => {
					if (err) throw err;
					// console.log('File saved.');
				}
			);
		} else {
			socket.send('mac');
		}
	});
	socket.send('mac');
	socket.send('pic');
	setInterval(() => {
		socket.send('pic');
	}, 60 * 1000);
});

app.get('/getcamlist', async (req, res) => {
	await fs.mkdir(uploadsDir, { recursive: true });
	res.json(await fs.readdir(uploadsDir));
});

app.get('/getimglist', async (req, res) => {
	// let result = new Map();
	await fs.mkdir(uploadsDir, { recursive: true });
	let result = new Map(
		Object.entries(
			(
				await Promise.all(
					(await fs.readdir(uploadsDir))
						.filter(
							(value) =>
								/^[0-9A-Fa-f]{12}$/.test(value) &&
								(/^([0-9A-Fa-f]{12};)*([0-9A-Fa-f]{12})$/.test(req.query.cam)
									? (req.query.cam.split(';') || []).includes(value)
									: true)
						)
						// let filteredDirs = dirs;
						// if (/^([0-9A-Fa-f]{12};)*([0-9A-Fa-f]{12})$/.test(req.query.cam)) {
						// 	let macs = req.query.cam.split(';') || [];
						// 	filteredDirs = filteredDirs.filter((value) => macs.includes(value));
						// }

						// filteredDirs
						//	.filter((value) => /^[0-9A-Fa-f]{12}$/.test(value))
						.map(async (dir) => {
							let files = {};
							files[dir] = await fs.readdir(uploadsDir + dir);
							return files;
						})
				)
			).reduce((prev, curr) => Object.assign(prev, curr), {})
		)
	);
	if (req.query.newest == 'true') {
		result.forEach((value, key, map) => {
			map.set(
				key,
				value.reduce((prev, curr) =>
					parseInt(path.basename(prev)) < parseInt(path.basename(curr)) ? curr : prev
				)
			);
		});
	}
	res.json(Object.fromEntries(result));
});

app.use(express.static(uploadsDir));

app.use(handler);

app.listen(port, host, () => {
	console.log('Listening on ' + host + ':' + port);
});
