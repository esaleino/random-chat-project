import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
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

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.emit('hello', 'user: ' + socket.id);
});

io.on('message', (msg) => {
	console.log(msg);
});

io.on('disconnect', () => {
	console.log('user disconnected');
});

server.listen(port, () => {
	console.log(process.env.PORT);
	console.log(new Date());
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
