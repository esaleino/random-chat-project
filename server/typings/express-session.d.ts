import session from 'express-session';

declare module 'express-session' {
	interface SessionData {
		user?: object; // Adjust the type of 'user' as needed
	}
}
