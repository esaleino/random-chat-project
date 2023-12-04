'use client';
import { useState } from 'react';
import { TextInput, Button, Label } from 'flowbite-react';
import { Form as Formclasses } from '../components/styles';
import { getCookie } from '../components/cookies';
const LoginForm = () => {
	const serverAddress =
		process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const HandleSubmit = async (e: any) => {
		e.preventDefault();
		console.log('Login');
		console.log(formData);
		try {
			const response = await fetch(`${serverAddress}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
				credentials: 'include'
			});
			if (response.ok) {
				console.log('Success', getCookie('user'));
			} else {
				console.log('Error');
			}
		} catch {
			console.log('Error');
		}
	};
	return (
		<form onSubmit={HandleSubmit} className={Formclasses.container.small}>
			<div className={Formclasses.formRow}>
				<Label htmlFor='username' className={Formclasses.label}>
					Username
				</Label>
				<TextInput
					id='username'
					name='username'
					type='username'
					placeholder='Username'
					onChange={handleInputChange}
					className={Formclasses.input}
				/>
			</div>
			<div className={Formclasses.formRow}>
				<Label htmlFor='password' className={Formclasses.label}>
					Password
				</Label>
				<TextInput
					id='password'
					name='password'
					type='password'
					placeholder='Password'
					onChange={handleInputChange}
					className={Formclasses.input}
				/>
			</div>
			<Button type='submit' className={Formclasses.button}>
				Login
			</Button>
		</form>
	);
};

export default LoginForm;
