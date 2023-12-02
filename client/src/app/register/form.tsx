'use client';
import React, { useState } from 'react';
import { TextInput, Button, Label } from 'flowbite-react';
import { Form as Formclasses } from '../components/styles';

const RegistrationForm = () => {
	const serverAddress = process.env.NEXT_PUBLIC_API_URL || 'localhost:5000';
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		cPassword: '',
		firstName: '',
		lastName: ''
	});
	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log(formData);
		try {
			const response = await fetch(`${serverAddress}/api/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
			} else {
				console.log('Error');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleSubmit} className={Formclasses.container}>
			<div className={Formclasses.formBlock}>
				<div>
					<Label htmlFor='firstName' className={Formclasses.label}>
						First Name
					</Label>
					<TextInput
						id='firstName'
						name='firstName'
						type='text'
						placeholder='First Name'
						className={Formclasses.input}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<Label htmlFor='lastName' className={Formclasses.label}>
						Last Name
					</Label>
					<TextInput
						id='lastName'
						name='lastName'
						type='text'
						placeholder='Last Name'
						className={Formclasses.input}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className={Formclasses.formRow}>
				<Label htmlFor='email' className={Formclasses.label}>
					Email
				</Label>
				<TextInput
					id='email'
					name='email'
					type='email'
					placeholder='Email'
					className={Formclasses.input}
					onChange={handleInputChange}
				/>
			</div>
			<div className={Formclasses.formRow}>
				<Label htmlFor='username' className={Formclasses.label}>
					Username
				</Label>
				<TextInput
					id='username'
					name='username'
					type='text'
					placeholder='Username'
					className={Formclasses.input}
					onChange={handleInputChange}
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
					className={Formclasses.input}
					onChange={handleInputChange}
				/>
			</div>
			<div className={Formclasses.formRow}>
				<Label htmlFor='cPassword' className={Formclasses.label}>
					Confirm Password
				</Label>
				<TextInput
					id='cPassword'
					name='cPassword'
					type='password'
					placeholder='Confirm Password'
					className={Formclasses.input}
					onChange={handleInputChange}
				/>
			</div>
			<Button type='submit' className={Formclasses.button}>
				{' '}
				Register{' '}
			</Button>
		</form>
	);
};

export default RegistrationForm;
