import { useState } from "react";

const pieceArray = [];

for (let i = 0; i < 2; i++) {
	const pieceColor = i === 0 ? "white" : "black";
	const y = i === 0 ? 7 : 0;
	pieceArray.push({
		image: `assets/${pieceColor}_Rook.png`,
		x: 0,
		y,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Knight.png`,
		x: 1,
		y,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Bishop.png`,
		x: 2,
		y,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Queen.png`,
		x: 3,
		y,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_King.png`,
		x: 4,
		y,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Bishop.png`,
		x: 5,
		y,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Knight.png`,
		x: 6,
		y,
	});
	pieceArray.push({
		image: `assets/${pieceColor}_Rook.png`,
		x: 7,
		y,
	});
}

for (let i = 0; i < 8; i++) {
	pieceArray.push({
		image: "assets/white_Pawn.png",
		x: i,
		y: 6,
	});
}

for (let i = 0; i < 8; i++) {
	pieceArray.push({
		image: "assets/black_Pawn.png",
		x: i,
		y: 1,
	});
}

export const Pieces = () => {
	const [pieces, setPieces] = useState(pieceArray);
	const [activePiece, setActivePiece] = useState();
	const [gridX, setGridX] = useState();
	const [gridY, setGridY] = useState();
	return {
		pieces,
		setPieces,
		gridX,
		setGridX,
		gridY,
		setGridY,
		activePiece,
		setActivePiece,
	};
};
