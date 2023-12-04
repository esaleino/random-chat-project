'use client';
import dynamic from 'next/dynamic';
import { AuthProvider } from './authContext';
const MyNavbar = dynamic(() => import('./nav'), { ssr: false });

export default function NavbarLayout() {
	return (
		<AuthProvider>
			<MyNavbar />
		</AuthProvider>
	);
}
