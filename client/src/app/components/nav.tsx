'use client';
import { Suspense, useEffect } from 'react';
import { getCookie, removeCookie } from './cookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navbar, Flowbite, Dropdown } from 'flowbite-react'; // Adjust the import path based on your actual file structure
import dynamic from 'next/dynamic';
import { useAuth } from './authContext';
const DarkThemeToggle = dynamic(
	() => import('flowbite-react').then((mod) => mod.DarkThemeToggle),
	{
		ssr: false,
		loading: () => <p></p>
	}
);

const MyNavbar = () => {
	const { isLoggedIn, user, setUser } = useAuth();
	const router = useRouter();
	/* useEffect(() => {
		const user = getCookie('user');

		if (user) {
			console.log(user);
			const userData = JSON.parse(user);
			const dateNow: Date = new Date();
			console.log(Date.parse(userData.expires), dateNow.getTime());
			if (userData && Date.parse(userData.expires) < dateNow.getTime()) {
				removeCookie('user');
				console.log('User session has expired, deleting cookie');
				setIsLoggedIn(false);
			} else {
				setUser(userData.username);
				setIsLoggedIn(true);
				const newDate = dateNow.setMinutes(dateNow.getMinutes() + 30);
				userData.expires = new Date(newDate);
				setCookie('user', JSON.stringify(userData));
			}
		}
	}, [isLoggedIn, setIsLoggedIn]); */
	useEffect(() => {
		const userCookie = getCookie('user');

		if (userCookie) {
			const userData = JSON.parse(userCookie);
			const dateNow = new Date();

			if (userData && Date.parse(userData.expires) < dateNow.getTime()) {
				removeCookie('user');
				setUser(null);
			} else {
				setUser(userData.username);
			}
		}
	}, [setUser]);
	const handleLogout = () => {
		removeCookie('user');
		setUser(null);
		router.refresh();
	};
	const navbarLinkClass =
		'whitespace-nowrap text-lg font-semibold text-white hover:text-gray-200';
	return (
		<Flowbite>
			<Navbar
				fluid={true}
				rounded={true}
				className='bg-primaryLight dark:bg-primaryDark'
			>
				<Navbar.Brand href='/'>
					<Image
						src='https://flowbite.com/docs/images/logo.svg'
						className='mr-3 h-6 sm:h-9'
						width='50'
						height='50'
						alt='Flowbite Logo'
					/>
					<span className='self-center whitespace-nowrap text-xl font-semibold text-white'>
						Random Chat
					</span>
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Navbar.Link href='/chat' className={`${navbarLinkClass}`}>
						Chat
					</Navbar.Link>
					<Navbar.Link href='/' className={`${navbarLinkClass}`}>
						About
					</Navbar.Link>
					<Navbar.Link href='/' className={`${navbarLinkClass}`}>
						Contact
					</Navbar.Link>
					{isLoggedIn ? (
						<>
							<Dropdown
								suppressHydrationWarning
								arrowIcon={false}
								inline
								label={
									<Navbar.Link className={`${navbarLinkClass}`}>
										{user}
									</Navbar.Link>
								}
								placement='top'
							>
								<Dropdown.Item href='/profile'>Profile</Dropdown.Item>
								<Dropdown.Item href='/settings'>Settings</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
							</Dropdown>
						</>
					) : (
						<>
							<Navbar.Link href='/login' className={`${navbarLinkClass}`}>
								Login
							</Navbar.Link>
							<Navbar.Link href='/register' className={`${navbarLinkClass}`}>
								Register
							</Navbar.Link>
						</>
					)}
				</Navbar.Collapse>

				<Suspense>
					<DarkThemeToggle />
				</Suspense>
			</Navbar>
		</Flowbite>
	);
};

export default MyNavbar;
