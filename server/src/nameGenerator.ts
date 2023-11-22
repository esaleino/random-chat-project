import fs from 'fs';
import path from 'path';
import { PATHS } from '../paths';

const nameGenerator = () => {
	const data = JSON.parse(fs.readFileSync(PATHS.FILES.NAME_CONFIG, 'utf8'));
	return {
		newName: () => {
			let name = '';
			name += data.verbs[getRandomInt(data.verbs.length)] + ' ';
			name += data.adjectives[getRandomInt(data.adjectives.length)] + ' ';
			name += data.nouns[getRandomInt(data.nouns.length)];
			return name;
		}
	};
};

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export { nameGenerator };
