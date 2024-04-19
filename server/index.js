import express, { raw } from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import fs from 'node:fs';
import { handler } from '../build/handler.js';

const port = 80;
const ws_port = 3109;
const app = express();
const server = createServer(app);

const wsServer = new WebSocketServer({ port: ws_port });

wsServer.on('connection', (socket, req) => {
	let command = 'mac';
	socket.send(command);
	socket.on('message', (message) => {
		// socket.send(message);
		if (command == 'mac') {
			console.log(req.socket.remoteAddress);
			console.log(message.toString());
		}
		// console.log(message.toString());
		// fs.writeFile(
		// 	'./server/uploads/image.jpg',
		// 	message.toString(),
		// 	{ encoding: 'base64' },
		// 	function (err) {
		// 		console.log('File created');
		// 	}
		// );
		if (command == 'pic') {
			fs.writeFile('./server/uploads/test.jpg', message, 'binary', function (err) {
				if (err) throw err;
				console.log('File saved.');
			});
		}
		// fs.writeFile('./server/uploads/test.txt', message.toString(), {}, function (err) {
		// 	console.log('File created');
		// });
	});
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
app.use(handler);

server.listen(port, '192.168.50.41');
