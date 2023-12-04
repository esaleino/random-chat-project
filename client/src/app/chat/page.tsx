'usee client';
import dynamic from 'next/dynamic';
import { AuthProvider } from '../components/authContext';
const ChatComponent = dynamic(() => import('./chat'), {
	ssr: false
});
export default function ChatPage() {
	return (
		<AuthProvider>
			<ChatComponent />
		</AuthProvider>
	);
}
