/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'modal-bg':"url(assets/modal.png)",
        'close-bt':"url(assets/XBt.png)",
        'right-bt':"url(assets/RightBt-u.png)",
        'left-bt':"url(assets/LeftBt-u.png)",
        'plus-bt':"url(assets/PlusBt-u.png)"
      }
    },
  },
  plugins: [],
};
