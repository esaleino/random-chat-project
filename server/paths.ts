const path = require('path');

const srcdir = path.join(__dirname, './src');

const dirs = {
	PUBLIC: path.join(__dirname, './public/'),
	UTILS: path.join(srcdir, './utils'),
	ROUTES: path.join(srcdir, './routes'),
	CONTROLLERS: path.join(srcdir, './controllers')
};

const PATHS = {
	FOLDERS: {
		PUBLIC: dirs.PUBLIC,
		SRC: srcdir,
		CONTROLLERS: dirs.CONTROLLERS,
		ROUTES: dirs.ROUTES,
		UTILS: dirs.UTILS
	},
	FILES: {
		TYPES: path.join(dirs.UTILS, 'types.js'),
		AUTH_ROUTES: path.join(dirs.ROUTES, 'authRoutes.js'),
		NAME_CONFIG: path.join(dirs.PUBLIC, 'nameConfig.json'),
		NAME_GENERATOR: path.join(dirs.UTILS, 'nameGenerator.js'),
		SOCKET_CONTROLLER: path.join(dirs.CONTROLLERS, 'socketController.js')
	}
};

export { PATHS };
