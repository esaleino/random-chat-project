import { pool } from './dbConnect';
import {
	RegisterUserBody,
	LoginUserBody,
	UserBody,
	UserSession
} from '../utils/types';
const crypto = require('crypto');
const saltRounds = process.env.SALT_ROUNDS || 10;

export async function RegisterUser(body: RegisterUserBody) {
	return new Promise(async (resolve, reject) => {
		const salt = crypto.randomBytes(16).toString('hex');
		const hash = await hashPassword(body.password, salt);
		pool.query(
			`INSERT INTO users (email, username, hash, salt, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?)`,
			[body.email, body.username, hash, salt, body.firstName, body.lastName],
			(err, results) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if ('insertId' in results) {
						const insertedUserId = results.insertId;
						const responseData = {
							userId: insertedUserId,
							message: 'Registration successful!'
						};

						resolve(responseData);
					} else {
						reject(new Error('Error inserting user into database'));
					}
				}
			}
		);
	});
}

export async function LoginUser(body: LoginUserBody) {
	return new Promise(async (resolve, reject) => {
		pool.query(
			`SELECT * FROM users WHERE username = ?`,
			[body.username],
			async (err, results) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					if (Array.isArray(results) && results.length > 0) {
						const user = results[0] as UserBody; // Assuming RowDataPacket
						if ('salt' in user) {
							const hash = await hashPassword(body.password, user.salt);
							const expirationDate = new Date();
							expirationDate.setMinutes(expirationDate.getMinutes() + 30);
							if (hash === user.hash) {
								const responseData: UserSession = {
									userId: user.id,
									username: user.username,
									email: user.email,
									firstName: user.firstName,
									lastName: user.lastName,
									expires: expirationDate
								};
								resolve(responseData);
							} else {
								reject(new Error('Password is incorrect'));
							}
						} else {
							reject(new Error('Unexpected result structure'));
						}
					} else {
						reject(new Error('Username is incorrect'));
					}
				}
			}
		);
	});
}

function hashPassword(password: string, salt: string) {
	return new Promise((resolve, reject) => {
		crypto.pbkdf2(
			password,
			salt,
			saltRounds,
			64,
			'sha512',
			(err: any, derivedKey: any) => {
				if (err) reject(err);
				const hash = derivedKey.toString('hex');
				resolve(hash);
			}
		);
	});
}
