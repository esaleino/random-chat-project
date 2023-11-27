import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<h1>Welcome to the Chat App</h1>
			<p>
				Get started by <Link href='/chat'>joining the chat</Link>!
			</p>
		</div>
	);
}
