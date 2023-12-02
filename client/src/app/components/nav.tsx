'use client';
import { Navbar, Flowbite, DarkThemeToggle } from 'flowbite-react'; // Adjust the import path based on your actual file structure
import Image from 'next/image';
const MyNavbar = () => {
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
					<Navbar.Link href='/login' className={`${navbarLinkClass}`}>
						Login
					</Navbar.Link>
					<Navbar.Link href='/register' className={`${navbarLinkClass}`}>
						Register
					</Navbar.Link>
					<Navbar.Link href='/' className={`${navbarLinkClass}`}>
						Contact
					</Navbar.Link>
				</Navbar.Collapse>
				<DarkThemeToggle />
			</Navbar>
		</Flowbite>
	);
};

export default MyNavbar;
