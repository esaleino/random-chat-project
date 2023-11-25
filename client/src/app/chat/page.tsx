'use client';
import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

export default function WebSocketPage() {
	const serverAddress = process.env.SERVER_ADDRESS || 'http://localhost:5000';
	const [socket, setSocket] = useState<Socket | null>(null);
	const [name, setName] = useState<string | null>(null);
	const [message, setMessage] = useState('');
	const [receivedMessage, setReceivedMessage] = useState('');
	const [chatMessages, setChatMessages] = useState<{ text: string; type: 'server' | 'user' }[]>([]);
	const [inChat, setInChat] = useState<boolean>(false);
	const connectSocket = () => {
		// Check if a socket connection doesn't already exist
		if (!socket || !socket.connected) {
			const newSocket = io(serverAddress);

			newSocket.on('connect', () => {
				console.log('Connected to Socket.IO server');
			});

			newSocket.on('hello', (msg) => {
				console.log(`Received: ${msg}`);
				setReceivedMessage(msg);
				setChatMessages((prevMessages) => [...prevMessages, { text: msg, type: 'server' }]);
				setName(msg.replace('name: ', ''));
			});

			newSocket.on('message', (msg) => {
				console.log(`Received: ${msg}`);
				setReceivedMessage(msg);
				setChatMessages((prevMessages) => [...prevMessages, { text: msg, type: 'server' }]);
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

	const enterChat = () => {
		if (socket) {
			socket.emit('enterChat');
			setInChat(true);
		}
	};

	const handleSendMessage = () => {
		if (socket) {
			socket.emit('message', message);
			setChatMessages((prevMessages) => [...prevMessages, { text: message, type: 'user' }]);
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
			<button onClick={enterChat} disabled={!name}>
				{' '}
				{inChat ? 'Already in Chat' : 'Enter Chat'}
			</button>
			<br />
			<div
				style={{
					border: '1px solid #ccc',
					minHeight: '200px',
					padding: '10px',
					marginBottom: '10px',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				{chatMessages.map((msg, index) => (
					<div
						key={index}
						style={{
							alignSelf: msg.type === 'server' ? 'flex-start' : 'flex-end',
							backgroundColor: msg.type === 'server' ? '#d3d3d3' : '#5bc0de',
							padding: '5px 10px',
							borderRadius: '10px',
							marginBottom: '5px'
						}}
					>
						{msg.text}
					</div>
				))}
			</div>
			<input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
			<button onClick={handleSendMessage}>Send Message</button>
			<button onClick={handleClearChat}>Clear Chat</button>
			<br />
			<div>Last Received Message: {receivedMessage}</div>
		</div>
	);
}
