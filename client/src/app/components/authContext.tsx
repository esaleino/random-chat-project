// authContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, removeCookie, setCookie } from './cookies';

interface AuthContextProps {
	isLoggedIn: boolean | null;
	user: string | null;
	setUser: (value: string | null) => void;
	setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
	isLoggedIn: null,
	user: null,
	setUser: (value: string | null) => {},
	setIsLoggedIn: (value: boolean) => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(
		getCookie('user') !== null
	);
	const storedUser = getCookie('user');
	const storedUsername = storedUser ? JSON.parse(storedUser)?.username : null;

	const [user, setUser] = useState<string | null>(storedUsername);

	useEffect(() => {
		const storedUser = getCookie('user');
		if (storedUser) {
			console.log('Auth: ', isLoggedIn);
			const userData = JSON.parse(storedUser);
			const dateNow: Date = new Date();
			if (userData && Date.parse(userData.expires) > dateNow.getTime()) {
				setIsLoggedIn(true);
				setUser(userData.username);
				const newDate = dateNow.setMinutes(dateNow.getMinutes() + 30);
				userData.expires = new Date(newDate);
				setCookie('user', JSON.stringify(userData));
				localStorage.setItem('isLoggedIn', 'true');
			} else {
				removeCookie('user');
				console.log('User session has expired, deleting cookie');
				setIsLoggedIn(false);
				setUser(null);
				localStorage.setItem('isLoggedIn', 'false');
			}
		} else {
			setIsLoggedIn(false);
			setUser(null);
		}
	}, [isLoggedIn]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, user, setUser, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
