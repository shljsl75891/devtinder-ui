export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // As these are dynamically added classes using toaster provider, we need to safelist them
  safelist: ['alert-info', 'alert-success', 'alert-warning', 'alert-error'],
  theme: {
    extend: {},
  },
  plugins: [],
};
