import React from "react";
import { SquareBlack } from "../chess/model/SquareBlack";
import { SquareWhite } from "../chess/model/SquareWhite";

export const Board = () => {
	let x = 0;
	const squares = [];
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareWhite key={x} />);
		x++;
		squares.push(<SquareBlack key={x} />);
	}
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareBlack key={x} />);
		x++;
		squares.push(<SquareWhite key={x} />);
	}
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareWhite key={x} />);
		x++;
		squares.push(<SquareBlack key={x} />);
	}
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareBlack key={x} />);
		x++;
		squares.push(<SquareWhite key={x} />);
	}
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareWhite key={x} />);
		x++;
		squares.push(<SquareBlack key={x} />);
	}
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareBlack key={x} />);
		x++;
		squares.push(<SquareWhite key={x} />);
	}
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareWhite key={x} />);
		x++;
		squares.push(<SquareBlack key={x} />);
	}
	for (let i = 0; i <= 3; i++) {
		x++;
		squares.push(<SquareBlack key={x} />);
		x++;
		squares.push(<SquareWhite key={x} />);
	}
	return (
		<div className="grid grid-cols-8 justify-center items-center border-8 border-white ">
			{squares}
		</div>
	);
};
