import express from 'express';
import { RegisterUser, LoginUser } from '../db/dbFunctions';
import { UserSession } from '../utils/types';
const router = express.Router();

router.post('/register', async (req, res) => {
	console.log(req.body);
	RegisterUser(req.body)
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('Error registering user');
		});
});

router.post('/login', async (req, res) => {
	console.log(req.body);
	console.log('user: ', req.session);
	LoginUser(req.body)
		.then((data: any) => {
			req.session.user = data as UserSession;
			res.cookie('user', JSON.stringify(req.session.user), {
				secure: true
			});
			res.status(200).send();
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('Error logging in user');
		});
});

export default router;
