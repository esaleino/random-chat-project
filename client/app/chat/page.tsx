'use client';
import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

const WebSocketPage = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [message, setMessage] = useState('');
	const [receivedMessage, setReceivedMessage] = useState('');
	const [chatMessages, setChatMessages] = useState<string[]>([]);
	const connectSocket = () => {
		// Check if a socket connection doesn't already exist
		if (!socket || !socket.connected) {
			const newSocket = io('http://localhost:5000');

			newSocket.on('connect', () => {
				console.log('Connected to Socket.IO server');
			});

			newSocket.on('hello', (msg) => {
				console.log(`Received: ${msg}`);
				setReceivedMessage(msg);
				setChatMessages((prevMessages) => [...prevMessages, msg]);
			});

			newSocket.on('message', (msg) => {
				console.log(`Received: ${msg}`);
				setReceivedMessage(msg);
				setChatMessages((prevMessages) => [...prevMessages, msg]);
			});

			setSocket(newSocket);
		}
	};

	const handleClearChat = () => {
		setChatMessages([]); // Clear the chat messages
	};

	useEffect(() => {
		// Clean up Socket.IO connection on component unmount
		return () => {
			if (socket && socket.connected) {
				socket.disconnect();
				setSocket(null);
			}
		};
	}, [socket]);

	const handleSendMessage = () => {
		if (socket) {
			socket.emit('message', message);
			setMessage(''); // Clear the textbox after sending
		}
	};

	const disconnectSocket = () => {
		// Check if a socket connection exists and is connected
		if (socket && socket.connected) {
			socket.disconnect();
			setSocket(null);
			console.log('Disconnected from Socket.IO server');
		}
	};

	return (
		<div>
			<button onClick={connectSocket}>Connect Socket</button>
			<button onClick={disconnectSocket}>Disconnect Socket</button>
			<br />
			<div
				style={{
					border: '1px solid #ccc',
					minHeight: '200px',
					padding: '10px',
					marginBottom: '10px'
				}}
			>
				{chatMessages.map((msg, index) => (
					<div key={index}>{msg}</div>
				))}
			</div>
			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={handleSendMessage}>Send Message</button>
			<button onClick={handleClearChat}>Clear Chat</button>
			<br />
			<div>Last Received Message: {receivedMessage}</div>
		</div>
	);
};

export default WebSocketPage;
