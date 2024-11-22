/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-pattern': 'radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0)',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { color: '#ff6b6b' }, // Red color
          '25%': { color: '#feca57' }, // Yellow color
          '50%': { color: '#1dd1a1' }, // Green color
          '75%': { color: '#54a0ff' }, // Blue color
        },
      },
      animation: {
        sparkle: 'sparkle 2s infinite', // 2 seconds color-changing animation
      },
    },
  },
  plugins: [],
}

