import React, { useRef } from "react";
import { Square } from "../chess/model/Square";
import { Pieces } from "../chess/model/PiecesStates";
import { Chess } from "chess.js";

const chess = new Chess();
export const Board = () => {
	const chessBoardRef = useRef(null);
	try {
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
			promotionOptions,
			setPromotionOptions,
		} = Pieces();
		const horizontalaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const verticalaxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
		const chessBoard = [];
		const turn = chess.turn();
		let fen = chess.fen();

		let elementSRC = "";
		let chessMove = 0;
		let movesAllowed = 0;
		let delPiece = 0;
		function promotePawn(e) {
			elementSRC = e.target.attributes.src.nodeValue;
			const updatedPieces = pieces.reduce((results, piece) => {
				if (piece.promote === true) {
					movesAllowed = chess.moves({ square: `${piece.currentPos}` });

					for (let z of movesAllowed) {
						if (elementSRC.includes("Queen")) {
							if (z.includes("Q")) {
								chessMove = z;
							}
						} else if (elementSRC.includes("Rook")) {
							if (z.includes("R")) {
								chessMove = z;
							}
						} else if (elementSRC.includes("Knight")) {
							if (z.includes("N")) {
								chessMove = z;
							}
						} else if (elementSRC.includes("Bishop")) {
							if (z.includes("B")) {
								chessMove = z;
							}
						}
					}
					// delPiece = pieces.find((p) => movesAllowed.some((move) => move.includes(p.currentPos)));
					delPiece = pieces.find((p) => chessMove.includes(p.currentPos));

					const pushedPieces = pieces.reduce((newResults, piece) => {
						console.log(delPiece);
						console.log(piece);
						if (delPiece) {
							if (delPiece.currentPos !== piece.currentPos) {
								newResults.push(piece);
							}
						} else {
							newResults.push(piece);
						}
						return newResults;
					}, []);

					piece.image = elementSRC;
					piece.currentPos = piece.tempMove;
					piece.promote = false;
					console.log(pushedPieces);
					for (let k of pushedPieces) {
						results.push(k);
					}
				}

				return results;
			}, []);
			console.log(updatedPieces);
			chess.move(chessMove);
			fen = chess.fen();
			setPieces(updatedPieces);
			setPromotionOptions(false);
		}

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
				const maxX = chessboard.offsetLeft + chessboard.clientWidth - 36;
				const maxY = chessboard.offsetTop + chessboard.clientHeight - 44;

				const x = e.clientX - 32;
				const y = e.clientY - 32;

				activePiece.style.position = "absolute";
				activePiece.style.left = `${x}px`;
				activePiece.style.top = `${y}px`;

				if (x < minX || x > maxX || y < minY || y > maxY) {
					activePiece.style.removeProperty("left");
					activePiece.style.removeProperty("top");
					setActivePiece(undefined);
					return;
				}

				if (x < minX) {
					activePiece.style.left = `${minX}px`;
					activePiece.style.position = "relative";
					activePiece.style.removeProperty("left");
					activePiece.style.removeProperty("top");
					setActivePiece(undefined);
				} else if (x > maxX) {
					activePiece.style.left = `${maxX}px`;
					activePiece.style.position = "relative";
					activePiece.style.removeProperty("left");
					activePiece.style.removeProperty("top");
					setActivePiece(undefined);
				} else {
					activePiece.style.left = `${x}px`;
				}

				if (y < minY) {
					activePiece.style.top = `${minY}px`;
					activePiece.style.position = "relative";
					activePiece.style.removeProperty("left");
					activePiece.style.removeProperty("top");
					setActivePiece(undefined);
				} else if (y > maxY) {
					activePiece.style.top = `${maxY}px`;
					activePiece.style.position = "relative";
					activePiece.style.removeProperty("left");
					activePiece.style.removeProperty("top");
					setActivePiece(undefined);
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
								if (piece.image === key[0]) {
									const movesAllowed = chess.moves({
										square: `${piece.currentPos}`,
									});
									const turn = chess.turn();
									const move = `${chessX}${chessY}`;
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
									console.log(movesAllowed);
									console.log(chessMove);
									const delPiece = pieces.find((p) => p.currentPos === move);
									if (delPiece && movesAllowed.includes(chessMove) && !movesAllowed.some((moves) => moves.includes("="))) {
										try {
											chess.move(`${chessMove}`);
											fen = chess.fen();
											const updatedPieces = pieces.reduce((results, piece) => {
												if (delPiece.currentPos !== piece.currentPos) {
													results.push(piece);
												}
												return results;
											}, []);
											setPieces(updatedPieces);
											piece.x = x;
											piece.y = y;
											piece.currentPos = move;
										} catch (error) {
											console.log(error);
										}
									} else if (movesAllowed.includes(chessMove) & fen.includes(move)) {
										if (move.includes("6")) {
											const lowerSquare = `${chessX}5`;
											const delPiece = pieces.find((p) => p.currentPos === lowerSquare);
											const updatedPieces = pieces.reduce((results, piece) => {
												if (delPiece.currentPos !== piece.currentPos) {
													results.push(piece);
												}
												return results;
											}, []);
											setPieces(updatedPieces);
										}
										if (move.includes("3")) {
											const lowerSquare = `${chessX}4`;
											const delPiece = pieces.find((p) => p.currentPos === lowerSquare);
											const updatedPieces = pieces.reduce((results, piece) => {
												if (delPiece.currentPos !== piece.currentPos) {
													results.push(piece);
												}
												return results;
											}, []);
											setPieces(updatedPieces);
										}
										fen = chess.fen();
										chess.move(chessMove);
										piece.x = x;
										piece.y = y;
										piece.currentPos = move;
										console.log("En Passant available");
									} else if (movesAllowed.includes(chessMove) && !movesAllowed.some((moves) => moves.includes("="))) {
										try {
											console.log("Move is Allowed");

											chess.move(`${chessMove}`);
											fen = chess.fen();
											if (chessMove === "O-O" || chessMove === "O-O+" || chessMove === "O-O#") {
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
											if (chessMove === "O-O-O" || chessMove === "O-O-O+" || chessMove === "O-O-O#") {
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
									} else if (
										movesAllowed.some((moves) => moves.includes("=")) &&
										movesAllowed.some((moves) => moves.includes(chessMove))
									) {
										console.log("Promotion Sequence Entered");
										piece.tempMove = move;
										piece.x = x;
										piece.y = y;
										setPromotionOptions(true);
										piece.promote = true;
									} else {
										console.log("Move is Not Allowed");

										activePiece.style.position = "relative";
										activePiece.style.removeProperty("left");
										activePiece.style.removeProperty("top");
										setActivePiece(undefined);
									}
								}
							}
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

				chessBoard.push(<Square key={`${horizontalaxis[i]}${verticalaxis[j]}`} id={`${i},${j}`} image={image} Even={isEven} />);
			}
		}

		return (
			<>
				<div className="flex flex-col">
					<div className="flex flex-row">
						{promotionOptions && (
							<div className="grid center place-content-center absolute left-0 top-0 right-0 bottom-0">
								<div className="flex flex-row bg-[rgba(0,0,0,0.7)] rounded-lg px-4 w-80 justify-evenly items-center h-80 z-20">
									<img
										onClick={(e) => promotePawn(e)}
										className="w-min hover:bg-stone-400 rounded-lg p-5"
										src={turn === "w" ? "assets/white_Queen.png" : "assets/black_Queen.png"}
										alt=""
									/>
									<img
										onClick={(e) => promotePawn(e)}
										className="w-min hover:bg-stone-400 rounded-lg p-5"
										src={turn === "w" ? "assets/white_Rook.png" : "assets/black_Rook.png"}
										alt=""
									/>
									<img
										onClick={(e) => promotePawn(e)}
										className="w-min hover:bg-stone-400 rounded-lg p-5"
										src={turn === "w" ? "assets/white_Knight.png" : "assets/black_Knight.png"}
										alt=""
									/>
									<img
										onClick={(e) => promotePawn(e)}
										className="w-min hover:bg-stone-400 rounded-lg p-5"
										src={turn === "w" ? "assets/white_Bishop.png" : "assets/black_Bishop.png"}
										alt=""
									/>
								</div>
							</div>
						)}
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
								onMouseUp={(e) => {
									dropPiece(e);
								}}
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
					</div>
					{chess.isCheckmate() && (
						<div className="grid center place-content-center absolute left-0 top-0 right-0 bottom-0">
							<div className="grid place-content-center absolute w-96 h-96 bg-[rgba(255,255,255,0.6)] top-[7rem] left-[37rem] rounded-lg text-red-600 text-3xl font-bold text-center">
								CheckMate!!
							</div>
						</div>
					)}
					<div className="grid self-center mt-5 ml-6 content-center w-36 h-16 bg-stone-200 rounded-lg text-xl font-bold text-center">
						{chess.isCheck() ? "Check" : chess.turn() === "w" ? "White to play" : chess.turn() === "b" ? "Black to play" : "---"}
					</div>
				</div>
			</>
		);
	} catch (error) {
		console.log(error);
		console.log("Game Over");
	}
};
