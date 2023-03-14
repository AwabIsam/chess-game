import React from "react";
export const Square = ({ id, image, Even }) => {
	return (
		<div
			className={
				Even
					? "w-16 h-16 bg-obsdOrange grid place-content-center"
					: "w-16 h-16 bg-gray grid place-content-center"
			}
		>
			{image && (
				<div
					id={id}
					className="chessPiece w-[64px] h-[64px] bg-no-repeat bg-center hover:cursor-grab active:cursor-grabbing"
					style={{ backgroundImage: `url(${image})` }}
				></div>
			)}
		</div>
	);
};
