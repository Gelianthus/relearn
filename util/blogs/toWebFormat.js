import { capitalize } from "../capitalize";

export function toWebFormat(str) {
	const split = str.split("-");
	return split
		.map((chars) => {
			return capitalize(chars);
		})
		.join(" ");
}

// str example: video-games

// output Video Games
