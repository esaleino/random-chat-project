import type { Metadata } from 'next';
import MyNavbar from './components/nav';
import { Inter } from 'next/font/google';

import { ThemeModeScript } from 'flowbite-react';
import './globals.css'; /*
import Link from 'next/link'; */
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Random chat app',
	description: 'Random chat app'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<ThemeModeScript />
				{/* <Script src='/js/load-theme.js' strategy='lazyOnload' defer /> */}
			</head>
			<body className={inter.className}>
				<MyNavbar />

				{children}
			</body>
		</html>
	);
}
