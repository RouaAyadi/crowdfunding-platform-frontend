import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#1A73E8", // modern blue
				accent: "#34D399", // fresh green for success
				bg: "#F9FAFB", // light gray
				card: "#FFFFFF", // white for campaigns/forms/cards
				"text-primary": "#111827", // almost black
				"text-secondary": "#6B7280", // muted gray for description/hints
			},
		},
	},
	plugins: [],
};
export default config;
