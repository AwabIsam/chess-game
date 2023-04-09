import { useState } from "react";

const axisY = {
	0: 8,
	1: 7,
	2: 6,
	3: 5,
	4: 4,
	5: 3,
	6: 2,
	7: 1,
};

const axisX = {
	0: "a",
	1: "b",
	2: "c",
	3: "d",
	4: "e",
	5: "f",
	6: "g",
	7: "h",
};

const pieceCode = [
	{ "assets/black_Pawn.png": "" },
	{ "assets/black_Knight.png": "n" },
	{ "assets/black_Bishop.png": "b" },
	{ "assets/black_Rook.png": "r" },
	{ "assets/black_Queen.png": "q" },
	{ "assets/black_King.png": "k" },
	{ "assets/white_Pawn.png": "" },
	{ "assets/white_Knight.png": "N" },
	{ "assets/white_Bishop.png": "B" },
	{ "assets/white_Rook.png": "R" },
	{ "assets/white_Queen.png": "Q" },
	{ "assets/white_King.png": "K" },
];

const pieceArray = [];

for (let i = 0; i < 2; i++) {
	const pieceColor = i === 0 ? "white" : "black";
	const y = i === 0 ? 7 : 0;
	pieceArray.push({
		image: `assets/${pieceColor}_Rook.png`,
		x: 0,
		y,
		currentPos: `${"a"}${axisY[y]}`,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Knight.png`,
		x: 1,
		y,
		currentPos: `${"b"}${axisY[y]}`,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Bishop.png`,
		x: 2,
		y,
		currentPos: `${"c"}${axisY[y]}`,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Queen.png`,
		x: 3,
		y,
		currentPos: `${"d"}${axisY[y]}`,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_King.png`,
		x: 4,
		y,
		currentPos: `${"e"}${axisY[y]}`,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Bishop.png`,
		x: 5,
		y,
		currentPos: `${"f"}${axisY[y]}`,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Knight.png`,
		x: 6,
		y,
		currentPos: `${"g"}${axisY[y]}`,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Rook.png`,
		x: 7,
		y,
		currentPos: `${"h"}${axisY[y]}`,
	});
}

for (let i = 0; i < 8; i++) {
	pieceArray.push({
		image: "assets/white_Pawn.png",
		x: i,
		y: 6,
		currentPos: `${axisX[i]}${axisY[6]}`,
		promote: false,
		tempMove: 0,
	});
}

for (let i = 0; i < 8; i++) {
	pieceArray.push({
		image: "assets/black_Pawn.png",
		x: i,
		y: 1,
		currentPos: `${axisX[i]}${axisY[1]}`,
		promote: false,
		tempMove: 0,
	});
}

export const Pieces = () => {
	const [pieces, setPieces] = useState(pieceArray);
	const [activePiece, setActivePiece] = useState();
	const [gridX, setGridX] = useState();
	const [gridY, setGridY] = useState();
	const [promotionOptions, setPromotionOptions] = useState(false);
	return {
		pieces,
		setPieces,
		gridX,
		setGridX,
		gridY,
		setGridY,
		activePiece,
		setActivePiece,
		axisX,
		axisY,
		pieceCode,
		promotionOptions,
		setPromotionOptions,
	};
};
