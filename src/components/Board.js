import React, { useRef } from "react";
import { Square } from "../chess/model/Square";
import { Pieces } from "../chess/model/PiecesStates";
import { Chess } from "chess.js";

const chess = new Chess();

export const Board = () => {
	const chessBoardRef = useRef(null);
	while (!chess.isGameOver()) {
		// Initailizing the Pieces
		const {
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
		} = Pieces();
		const horizontalaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const verticalaxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
		const chessBoard = [];

		function grabPiece(e) {
			const element = e.target;
			const chessboard = chessBoardRef.current;

			if (element.classList.contains("chessPiece") && chessboard) {
				setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 64));
				setGridY(Math.floor((e.clientY - chessboard.offsetTop) / 64));
				setActivePiece(element);
			}
		}

		function movePiece(e) {
			const chessboard = chessBoardRef.current;
			if (activePiece && chessboard) {
				const minX = chessboard.offsetLeft - 10;
				const minY = chessboard.offsetTop - 5;
				const maxX =
					chessboard.offsetLeft + chessboard.clientWidth - 36;
				const maxY =
					chessboard.offsetTop + chessboard.clientHeight - 44;

				const x = e.clientX - 32;
				const y = e.clientY - 32;

				activePiece.style.position = "absolute";
				activePiece.style.left = `${x}px`;
				activePiece.style.top = `${y}px`;

				if (x < minX) {
					activePiece.style.left = `${minX}px`;
				} else if (x > maxX) {
					activePiece.style.left = `${maxX}px`;
				} else {
					activePiece.style.left = `${x}px`;
				}

				if (y < minY) {
					activePiece.style.top = `${minY}px`;
				} else if (y > maxY) {
					activePiece.style.top = `${maxY}px`;
				} else {
					activePiece.style.top = `${y}px`;
				}
			}
		}

		function dropPiece(e) {
			const chessboard = chessBoardRef.current;
			if (activePiece && chessboard) {
				const x = Math.floor((e.clientX - chessboard.offsetLeft) / 64);
				const y = Math.floor((e.clientY - chessboard.offsetTop) / 64);
				const chessY = axisY[y];
				const chessX = axisX[x];

				setPieces((value) => {
					const Pieces = value.map((piece) => {
						if (piece.x === gridX && piece.y === gridY) {
							for (let i = 0; i < pieceCode.length; i++) {
								const key = Object.keys(pieceCode[i]);
								const value = Object.values(pieceCode[i]);
								if (piece.image === key[0]) {
									console.log(piece.currentPos);
									const movesAllowed = chess.moves({
										square: `${piece.currentPos}`,
									});
									console.log(`Moves are: ${movesAllowed}`);
									const moveValidation = `${value}${chessX}${chessY}`;
									const move = `${chessX}${chessY}`;
									const delPiece = pieces.find(
										(p) => p.currentPos === move
									);
									const delIndex = pieces.findIndex(
										(p) => p.currentPos === move
									);

									console.log(delPiece);
									if (delPiece) {
										try {
											console.log(
												"Attacking a piece....."
											);
											chess.move(
												`${piece.currentPos}x${move}`
											);
											pieces.splice(delIndex, 1);
											piece.x = x;
											piece.y = y;
											piece.currentPos = move;
											console.log(chess.fen());
										} catch (error) {
											console.log(error);
										}
									}
									console.log(`Move Made ${moveValidation}`);
									if (movesAllowed.includes(moveValidation)) {
										try {
											console.log("Move is Allowed");
											// Check if dropped on piece

											chess.move({
												from: `${piece.currentPos}`,
												to: `${move}`,
											});

											piece.x = x;
											piece.y = y;
											piece.currentPos = move;

											console.log(piece);
										} catch (error) {
											console.log(error);
										}
									} else {
										console.log("Move is Not Allowed");

										activePiece.style.position = "relative";
										activePiece.style.removeProperty(
											"left"
										);
										activePiece.style.removeProperty("Top");
									}
								}
							}
							setActivePiece(undefined);
						}
						return piece;
					});
					return Pieces;
				});
			}
		}

		for (let j = 0; j < verticalaxis.length; j++) {
			for (let i = 0; i < horizontalaxis.length; i++) {
				const isEven = (i + j + 2) % 2 === 0;

				let image = undefined;

				pieces.forEach((piece) => {
					if (piece.x === i && piece.y === j) image = piece.image;
				});

				chessBoard.push(
					<Square
						key={`${horizontalaxis[i]}${verticalaxis[j]}`}
						id={`${i},${j}`}
						image={image}
						Even={isEven}
					/>
				);
			}
		}

		return (
			<>
				<div className="flex flex-col text-white">
					{verticalaxis.map((axis) => (
						<div className="h-16 mx-4" key={axis}>
							{axis}
						</div>
					))}
				</div>
				<div className="flex flex-col text-center">
					<div
						onMouseMove={(e) => movePiece(e)}
						onMouseDown={(e) => grabPiece(e)}
						onMouseUp={(e) => dropPiece(e)}
						ref={chessBoardRef}
						className="grid grid-cols-8 border-8 border-white"
					>
						{chessBoard}
					</div>
					<div className="flex flex-row text-white">
						{horizontalaxis.map((axis) => (
							<div className="w-16" key={axis}>
								{axis}
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
	console.log("Game Over");
};
