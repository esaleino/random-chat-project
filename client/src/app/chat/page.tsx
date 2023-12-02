'use client';
import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { Button, TextInput, Textarea } from 'flowbite-react';

export default function WebSocketPage() {
	const serverAddress = process.env.NEXT_PUBLIC_API_URL || 'localhost:5000';
	const [socket, setSocket] = useState<Socket | null>(null);
	const [name, setName] = useState<string | null>(null);
	const [message, setMessage] = useState('');
	const [receivedMessage, setReceivedMessage] = useState('');
	// prettier-ignore
	const [chatMessages, setChatMessages] = useState<{ text: string; type: 'server' | 'user' | 'error' }[]>([]);
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
				setChatMessages((prevMessages) => [
					...prevMessages,
					{ text: msg, type: 'server' }
				]);
				setName(msg.replace('You are chatting as: ', ''));
			});

			newSocket.on('message', (msg) => {
				console.log(`Received: ${msg}`);
				setReceivedMessage(msg);
				setChatMessages((prevMessages) => [
					...prevMessages,
					{ text: msg, type: 'server' }
				]);
			});

			newSocket.on('cerror', (msg) => {
				console.log(`Error: ${msg}`);
				setReceivedMessage(msg);
				setChatMessages((prevMessages) => [
					...prevMessages,
					{ text: msg, type: 'error' }
				]);
			});

			newSocket.on('userLeft', (msg) => {
				setInChat(false);
				console.log(`User Left: ${msg}`);
				setReceivedMessage(msg);
				setChatMessages((prevMessages) => [
					...prevMessages,
					{ text: msg, type: 'server' }
				]);
			});

			newSocket.on('disconnect', () => {
				setInChat(false);
				console.log('Disconnected from Socket.IO server');
				setReceivedMessage('Disconnected from server.');
				setChatMessages((prevMessages) => [
					...prevMessages,
					{ text: 'Disconnected from chat.', type: 'error' }
				]);
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
			handleClearChat();
			console.log('API_URL:', serverAddress);
			socket.emit('enterChat');
			setInChat(true);
		}
	};

	const handleSendMessage = () => {
		if (socket) {
			socket.emit('message', message);
			setChatMessages((prevMessages) => [
				...prevMessages,
				{ text: message, type: 'user' }
			]);
			setMessage(''); // Clear the textbox after sending
		} else {
			setReceivedMessage('Not connected to server.');
			setChatMessages((prevMessages) => [
				...prevMessages,
				{ text: 'Not connected to server.', type: 'error' }
			]);
			setMessage('');
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
	const leaveChat = () => {
		if (socket) {
			socket.emit('leaveChat');
			setInChat(false);
		}
	};
	return (
		<div className='container mx-auto '>
			<Button onClick={connectSocket}>Connect Socket</Button>
			<Button onClick={disconnectSocket}>Disconnect Socket</Button>
			<Button onClick={enterChat} disabled={!name}>
				{' '}
				{inChat ? 'Already in Chat' : 'Enter Chat'}
			</Button>
			<Button onClick={leaveChat} disabled={!inChat}>
				{' '}
				{inChat ? 'Leave Chat' : 'Not in Chat'}
			</Button>
			<br />
			<div
				className='bg-primaryLight dark:bg-primaryDark rounded-lg h-96 overflow-y-scroll'
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
							alignSelf:
								// prettier-ignore
								msg.type === 'server'
									? 'flex-start'
									: msg.type === 'error'
										? 'flex-start'
										: 'flex-end',
							backgroundColor:
								// prettier-ignore
								msg.type === 'server'
									? '#d3d3d3'
									: msg.type === 'error'
										? 'red'
										: '#5bc0de',
							padding: '5px 10px',
							borderRadius: '10px',
							marginBottom: '5px'
						}}
					>
						{msg.text}
					</div>
				))}
			</div>
			<div className='flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700'>
				<Textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Your message...'
				></Textarea>
				<Button
					onClick={handleSendMessage}
					className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
				>
					<svg
						className='w-5 h-5 rotate-90 rtl:-rotate-90'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 18 20'
					>
						<path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
					</svg>
					<span className='sr-only'>Send message</span>
				</Button>
			</div>
			<Button onClick={handleClearChat}>Clear Chat</Button>
			<br />
			<div>Last Received Message: {receivedMessage}</div>
		</div>
	);
}
