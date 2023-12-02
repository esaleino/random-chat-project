import { pool } from './dbConnect';
import { RegisterUserBody } from '../utils/types';

export function RegisterUser(body: RegisterUserBody) {
	return new Promise((resolve, reject) => {
		pool.query(
			`INSERT INTO users (email, username, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)`,
			[body.email, body.username, body.password, body.firstName, body.lastName],
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
