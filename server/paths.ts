const path = require('path');

const dirs = {
	PUBLIC: path.join(__dirname, './public/'),
	SRC: path.join(__dirname, './src')
};

const PATHS = {
	FOLDERS: {
		PUBLIC: dirs.PUBLIC,
		SRC: dirs.SRC
	},
	FILES: {
		NAME_CONFIG: path.join(dirs.PUBLIC, 'nameConfig.json'),
		NAME_GENERATOR: path.join(dirs.SRC, 'nameGenerator.js')
	}
};

export { PATHS };
