import express, { Express } from 'express';
import { Server } from 'socket.io';
const { PATHS } = require('./paths');
import authRoutes from './src/routes/authRoutes';
const { handleSocketConnection } = require(PATHS.FILES.SOCKET_CONTROLLER);
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
handleSocketConnection(io);
app.use(cors());

app.use('/api/auth', authRoutes);

server.listen(port, () => {
	console.log(process.env.PORT);
	console.log(new Date());
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
