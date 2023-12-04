export type RegisterUserBody = {
	email: string;
	username: string;
	password: string;
	cPassword: string;
	firstName: string;
	lastName: string;
};

export type LoginUserBody = {
	username: string;
	password: string;
};

export type UserBody = {
	id: number;
	email: string;
	username: string;
	hash: string;
	salt: string;
	firstName: string;
	lastName: string;
};

export type UserSession = {
	userId: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	expires: Date;
};
