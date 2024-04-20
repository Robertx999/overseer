import express from 'express';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import fs from 'node:fs';
import { handler } from '../build/handler.js';

const port = 80;
const ws_port = 3109;
const app = express();
const server = createServer(app);

const wsServer = new WebSocketServer({ port: ws_port });

wsServer.on('connection', (socket, req) => {
	let command,
		mac = undefined;
	socket.on('message', (message) => {
		// socket.send(message);
		if (command == 'mac') {
			console.log(req.socket.remoteAddress);
			console.log(message.toString());
			mac = message.toString();
		}
		if (command == 'pic' && mac != undefined) {
			fs.writeFile(`./server/uploads/${Date.now()}-${mac}`, message, 'binary', function (err) {
				if (err) throw err;
				console.log('File saved.');
			});
		}
	});
	command = 'mac';
	socket.send(command);
	command = 'pic';
	socket.send(command);
	setInterval(() => {
		command = 'pic';
		socket.send(command);
	}, 100);
});

// wsServer.on('listening');
// "data:image/jpeg;base64,"
// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.get('/getimglist', (req, res) => {
	let filteredFiles = [],
		cams = new Map();
	fs.readdir('./server/uploads/', (err, files) => {
		if (err) throw err;
		// files.filter((value) => value.)
		filteredFiles = files.filter((value) =>
			/^([0-9]*)([-]{1})([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/.test(value)
		);
		filteredFiles.sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]));
		filteredFiles.forEach((value) => {
			let mac = value.split('-')[1];
			cams.set(mac, [...cams.get(mac), value]);
		});
	});
	res.json({
		paths: cams
	});
});

app.use(handler);

server.listen(port, '192.168.50.41');
