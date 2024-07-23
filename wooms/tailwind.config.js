import modalImage from './src/assets/modal.png'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'modal-imgae':"url(modalImage)"
    },
  },
  plugins: [],
};
