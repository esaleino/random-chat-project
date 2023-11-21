'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketPage = () => {
	useEffect(() => {
		const socket = io('http://localhost:5000');

		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
		});

		socket.on('message', (message) => {
			console.log(`Received: ${message}`);
		});

		socket.on('hello', (message) => {
			console.log(`Received: ${message}`);
		});

		// Clean up Socket.IO connection on component unmount
		return () => {
			socket.disconnect();
		};
	}, []);

	return <div>Socket.IO Page</div>;
};

export default WebSocketPage;
