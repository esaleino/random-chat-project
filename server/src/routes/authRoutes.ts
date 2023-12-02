import express from 'express';
import { RegisterUser } from '../db/dbFunctions';
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

router.post('/login', (req, res) => {
	console.log(req.body);
	res.status(200).send('Login');
});

export default router;
