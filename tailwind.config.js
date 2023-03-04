/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				gray: "#282828",
				darkBody: "#263238",
				obsdOrange: "#c0540c",
			},
		},
	},
	plugins: [],
};
