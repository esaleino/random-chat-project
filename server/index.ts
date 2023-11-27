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

const chatPool = new Map();
let poolCounter = 1;
const MAX_POOLS = 10;
const chatNameSet = new Set(Array.from({ length: MAX_POOLS }, (_, i) => `Chat-${i + 1}`));
const connectedUsers = new Map<string, string>();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected' + socket.id);
	let userName = nameGen.newName();
	connectedUsers.set(socket.id, userName);
	socket.emit('hello', `name: ${userName}`);

	socket.on('message', (msg) => {
		console.log(`Received from ${userName}: ${msg}`);
		const pool = findPool(socket.id);

		if (!pool) {
			console.log('User is not in a chat pool');
			// User is not in a chat pool, handle the error
			socket.emit('cerror', 'You cannot send a message without being in a chat pool.');
			return;
		}

		for (const userId of chatPool.get(findPool(socket.id))) {
			if (typeof userId === 'string' && userId !== socket.id) {
				io.to(userId).emit('message', `${userName}: ${msg}`);
			}
		}
	});

	socket.on('enterChat', () => {
		console.log(`${userName} entered the chat`);
		//do logic
		if (findPool(socket.id) !== undefined) {
			socket.emit(
				'message',
				`${userName}, dear sir/madam/thing, you are already in a chat, please conserve your energy and wait for someone to join you`
			);
		} else {
			const result = getPool(socket.id);
			socket.join(result.pool);
			console.log(result.debug);
			socket.emit('message', `${result.message}`);
		}
	});

	socket.on('disconnect', () => {
		console.log('user disconnected' + socket.id);
		const pool = findPool(socket.id);
		if (pool) {
			io.to(pool).emit('userLeft', `${userName} has left the chat, closing chat room`);
			chatNameSet.add(pool);
			console.log(chatNameSet);
			chatPool.delete(pool);
		}
		connectedUsers.delete(socket.id);
	});

	socket.on('leaveChat', () => {
		console.log(`${userName} left the chat`);
		const pool = findPool(socket.id);
		if (pool) {
			const usersInPool = chatPool.get(pool);
			usersInPool.delete(socket.id);
			const remainingUser = Array.from(usersInPool)[0] as string | undefined;
			socket.emit('userLeft', `You have left the chat, closing chat room`);
			if (remainingUser) {
				io.to(remainingUser).emit('userLeft', `${userName} has left the chat, closing chat room`);
			}
			chatNameSet.add(pool);
			chatPool.delete(pool);
		}
	});
});

server.listen(port, () => {
	console.log(process.env.PORT);
	console.log(new Date());
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function getPool(id: string) {
	let pool: string | undefined;
	let message: string | undefined;
	let debug: string | undefined;
	// Find existing pool
	for (const [poolId, users] of chatPool) {
		if (users.size < 2 && !users.has(id)) {
			pool = poolId;
			debug = users;
			let chatterId = Array.from(users).join(', ');
			let userName = connectedUsers.get(chatterId);
			message = 'Found a pool, you are now chatting with: ' + userName + '!';
			break;
		}
	}
	// Create new pool
	if (!pool) {
		const poolArray = Array.from(chatNameSet);
		const randomIndex = Math.floor(Math.random() * poolArray.length);
		pool = poolArray[randomIndex];
		chatPool.set(pool, new Set());
		chatNameSet.delete(pool);
		debug = pool;
		message = 'No available chatters found, waiting for someone to join you';
	}
	const usersInPool = chatPool.get(pool);
	usersInPool.add(id);
	return { pool, message, debug };
}

function findPool(id: string) {
	for (const [poolId, users] of chatPool) {
		if (users.has(id)) {
			return poolId;
		}
	}
	return undefined;
}

setInterval(() => {
	console.log('chatPool', chatPool);
	console.log('connectedUsers', connectedUsers);
}, 10000);
