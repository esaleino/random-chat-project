import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
const { PATHS } = require('./paths');
const { nameGenerator } = require(PATHS.FILES.NAME_GENERATOR);
const nameGen = nameGenerator();
const app: Express = express();
const http = require('http');
const cors = require('cors');
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {});

io.on('connection', (socket) => {
	console.log('a user connected' + socket.id);
	let name = nameGen.newName();
	socket.emit('hello', 'user: ' + socket.id + ' name: ' + name);

	socket.on('message', (msg) => {
		console.log(`Received: ${msg}`);
		socket.emit('message', msg);
		// Handle the received message as needed
	});

	socket.on('disconnect', () => {
		console.log('user disconnected' + socket.id);
	});
});

server.listen(port, () => {
	console.log(process.env.PORT);
	console.log(new Date());
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
