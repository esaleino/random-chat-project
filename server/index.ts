import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
const app: Express = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
});
server.listen(port, () => {
	console.log(process.env.PORT);
	console.log(new Date());
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
