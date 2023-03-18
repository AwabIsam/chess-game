import React, { useRef } from "react";
import { Square } from "../chess/model/Square";
import { Pieces } from "../chess/model/PiecesStates";
import { Chess } from "chess.js";

const chess = new Chess();

export const Board = () => {
	const chessBoardRef = useRef(null);
	while (!chess.isGameOver()) {
		// Initailizing the Pieces, States and required arrays
		const { pieces, setPieces, gridX, setGridX, gridY, setGridY, activePiece, setActivePiece, axisX, axisY, pieceCode } = Pieces();
		const horizontalaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const verticalaxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
		const chessBoard = [];

		function grabPiece(e) {
			const element = e.target;
			const chessboard = chessBoardRef.current;

			if (element.classList.contains("chessPiece") && chessboard) {
				// Get initial co-ordinates on 'grab'
				setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 64));
				setGridY(Math.floor((e.clientY - chessboard.offsetTop) / 64));
				setActivePiece(element);
			}
		}

		function movePiece(e) {
			const chessboard = chessBoardRef.current;
			if (activePiece && chessboard) {
				// if a piece is 'grabbed' and the chesboard is rendered
				// Get the axes of the board to restrict movement to board
				const minX = chessboard.offsetLeft - 10;
				const minY = chessboard.offsetTop - 5;
				const maxX = chessboard.offsetLeft + chessboard.clientWidth - 36;
				const maxY = chessboard.offsetTop + chessboard.clientHeight - 44;

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
				// Get axes of new position
				const x = Math.floor((e.clientX - chessboard.offsetLeft) / 64);
				const y = Math.floor((e.clientY - chessboard.offsetTop) / 64);
				// Set the axes to 'fen' format for chessjs library
				const chessY = axisY[y];
				const chessX = axisX[x];

				setPieces((value) => {
					// Map through the pieces
					const Pieces = value.map((piece) => {
						if (piece.x === gridX && piece.y === gridY) {
							// Find piece
							for (let i = 0; i < pieceCode.length; i++) {
								// Get the key and value from the pieceCode array
								const key = Object.keys(pieceCode[i]);
								if (piece.image === key[0]) {
									// Ensure we have the correct piece
									// Get array of allowed moves
									const movesAllowed = chess.moves({
										square: `${piece.currentPos}`,
									});
									// Get turn
									const turn = chess.turn();
									// Get move for chessjs
									const move = `${chessX}${chessY}`;
									// Get move FOR fen
									let chessMove = 0;
									for (let l of movesAllowed) {
										if (l.includes(move)) {
											chessMove = l;
										} else if (l.includes("O-O") && (move === "g1" || move === "g8")) {
											chessMove = l;
										} else if (l.includes("O-O-O") && (move === "c1" || move === "c8")) {
											chessMove = l;
										}
									}
									// Save 'Attacked' piece

									const delPiece = pieces.find((p) => p.currentPos === move);
									if (delPiece && movesAllowed.includes(chessMove)) {
										// If we are attacking
										try {
											chess.move(`${chessMove}`);
											// Changeing array (removing the attacked piece)
											const updatedPieces = pieces.reduce((results, piece) => {
												if (delPiece.currentPos !== piece.currentPos) {
													results.push(piece);
												}
												return results;
											}, []);
											setPieces(updatedPieces);
											// Snap piece to new axes
											piece.x = x;
											piece.y = y;
											piece.currentPos = move;
										} catch (error) {
											console.log(error);
										}
									} else if (movesAllowed.includes(chessMove)) {
										// If we aren't attacking -->
										try {
											console.log("Move is Allowed");
											// Check if dropped on piece

											chess.move(`${chessMove}`);
											if (chessMove === "O-O") {
												const updatedPieces = pieces.reduce((results, piece) => {
													if (turn === "w" && piece.image.includes("white_Rook")) {
														if (piece.currentPos === "h1") {
															piece.x = 5;
															piece.y = 7;
															piece.currentPos = "f1";
														}
														results.push(piece);
													} else if (turn === "b" && piece.image.includes("black_Rook")) {
														if (piece.currentPos === "h8") {
															piece.x = 5;
															piece.y = 0;
															piece.currentPos = "f8";
														}
														results.push(piece);
													} else {
														results.push(piece);
													}
													return results;
												}, []);
												setPieces(updatedPieces);
											}
											if (chessMove === "O-O-O") {
												const updatedPieces = pieces.reduce((results, piece) => {
													if (turn === "w" && piece.image.includes("white_Rook")) {
														if (piece.currentPos === "a1") {
															piece.x = 3;
															piece.y = 7;
															piece.currentPos = "d1";
														}
														results.push(piece);
													} else if (turn === "b" && piece.image.includes("black_Rook")) {
														if (piece.currentPos === "a8") {
															piece.x = 3;
															piece.y = 0;
															piece.currentPos = "d8";
														}
														results.push(piece);
													} else {
														results.push(piece);
													}
													return results;
												}, []);
												setPieces(updatedPieces);
											}
											piece.x = x;
											piece.y = y;
											piece.currentPos = move;
										} catch (error) {
											console.log(error);
										}
									} else {
										console.log("Move is Not Allowed");

										activePiece.style.position = "relative";
										activePiece.style.removeProperty("left");
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

		// Everything below here is to render the chessboard and pieces
		for (let j = 0; j < verticalaxis.length; j++) {
			for (let i = 0; i < horizontalaxis.length; i++) {
				const isEven = (i + j + 2) % 2 === 0;

				let image = undefined;

				pieces.forEach((piece) => {
					if (piece.x === i && piece.y === j) image = piece.image;
				});

				chessBoard.push(<Square key={`${horizontalaxis[i]}${verticalaxis[j]}`} id={`${i},${j}`} image={image} Even={isEven} />);
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
