import Cookies from 'js-cookie';

export const setCookie = (key: any, value: any, options = {}) => {
	Cookies.set(key, value, options);
};

export const getCookie = (key: any) => {
	return Cookies.get(key);
};

export const removeCookie = (key: any) => {
	Cookies.remove(key);
};
