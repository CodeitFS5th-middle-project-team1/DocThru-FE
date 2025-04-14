module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 사용하는 경로에 맞게 설정!
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
