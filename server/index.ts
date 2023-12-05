import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import session from 'express-session';
import cookieParser from 'cookie-parser';
const { PATHS } = require('./paths');
import authRoutes from './src/routes/authRoutes';
const { handleSocketConnection } = require(PATHS.FILES.SOCKET_CONTROLLER);

const app: Express = express();
const http = require('http');
const cors = require('cors');
const port = process.env.PORT || 5000;
const server = http.createServer(app);

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const io = new Server(server, {
	cors: {
		origin: clientOrigin,
		methods: ['GET', 'POST']
	}
});

app.use(cookieParser());
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true, sameSite: 'none' }
	})
);

handleSocketConnection(io);
app.use(
	cors({
		origin: clientOrigin,
		credentials: true
	})
);
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

server.listen(port, () => {
	console.log(process.env.PORT);
	console.log(new Date());
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
