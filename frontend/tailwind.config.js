/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin");

module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};






// tailwind.config.js

// const flowbite = require("flowbite-react/tailwind");

// module.exports = {
//   content: [
//     // Include Flowbite components
//     "./src/**/*.{html,js,jsx,ts,tsx}", // Add your file paths
//     flowbite.content(),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     // Include Flowbite plugin
//     flowbite.plugin(),
//   ],
// };




