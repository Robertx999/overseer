import express from 'express';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import fs from 'node:fs';
import { handler } from '../build/handler.js';

////////////////////////// CONFIG //////////////////////////
const host = '';
const port = 80;
const ws_port = 3109;
const uploadsDir = './server/uploads/';
////////////////////////////////////////////////////////////

const app = express();
const server = createServer(app);

const wsServer = new WebSocketServer({ port: ws_port });

wsServer.on('connection', (socket, req) => {
	let mac = '';
	socket.on('message', (message) => {
		// socket.send(message);
		let header = message.slice(0, 3).toString();
		if (header == 'mac') {
			// console.log(req.socket.remoteAddress);
			// console.log(message.toString());
			mac = message.slice(3).toString();
			console.log(mac);
		} else if (/^[0-9A-Fa-f]{12}$/.test(mac)) {
			// console.log(message.slice(3, 20));
			let dirPath = uploadsDir + mac.replaceAll(':', '');
			fs.stat(dirPath, (err, stats) => {
				if (!stats.isDirectory()) {
					fs.mkdir(dirPath, (err) => {
						if (err) throw err;
					});
				}
			});
			fs.writeFile(
				dirPath + '/' + Date.now() + '.jpg',
				message,
				{ encoding: 'binary', flag: 'w' },
				(err) => {
					if (err) throw err;
					console.log('File saved.');
				}
			);
		} else {
			socket.send('mac');
		}
	});
	socket.send('mac');
	setInterval(() => {
		socket.send('pic');
	}, 5000);
});

app.get('/getcamlist', (req, res) => {
	fs.readdir(uploadsDir, (err, dirs) => {
		if (err) {
			res.status(500).end();
			throw err;
		}

		res.json(dirs);
	});
});

app.get('/getimglist', (req, res) => {
	let result = new Map();
	console.log(req.query.cam);
	fs.readdir(uploadsDir, (err, dirs) => {
		if (err) {
			res.status(500).end();
			throw err;
		}
		// console.log(files);
		let filteredDirs = dirs;
		if (req.query.cam) {
			filteredDirs = filteredDirs.filter((value) => req.query.cam == value);
		}

		filteredDirs
			.filter((value) => /^[0-9A-Fa-f]{12}$/.test(value))
			.forEach((dir) => {
				fs.readdir(uploadsDir + dir, (err, files) => {
					if (err) {
						res.status(500).end();
						throw err;
					}
					result.set(
						dir,
						files.filter((value) => /^(\d*)\.jpg$/.test(value))
					);
					res.json(Object.fromEntries(result));
				});
			});
	});
});

app.use(handler);

server.listen(port, host);
