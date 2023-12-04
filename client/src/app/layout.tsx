import type { Metadata } from 'next';
import NavbarLayout from './components/navPage';
import { Inter } from 'next/font/google';
import { ThemeModeScript } from 'flowbite-react';
import './globals.css';

/*
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
	const originalConsoleError = console.error;
	console.error = (...args) => {
		// Check if the warning message is present
		if (args[0].includes('Prop `data-active` did not match.')) {
			// Do nothing or log a custom message if needed
			return;
		}

		// Call the original console.error for other messages
		originalConsoleError.apply(console, args);
	};
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<ThemeModeScript />
				{/* <Script src='/js/load-theme.js' strategy='lazyOnload' defer /> */}
			</head>
			<body className={inter.className}>
				<NavbarLayout />
				{children}
			</body>
		</html>
	);
}
