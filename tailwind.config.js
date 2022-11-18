const {width} = require('./theme-extend-tailwind/theme.extend.width');
const {height} = require('./theme-extend-tailwind/theme.extend.height');
const {maxHeight} = require('./theme-extend-tailwind/theme.extend.maxHeight');
const {backgroundColor} = require('./theme-extend-tailwind/theme.extend.backgroundColor');
const {screens} = require('./theme-extend-tailwind/theme.extend.breakpoints');

module.exports = {
    content: [
        './pages/**/*.{html,js,tsx}',
        './layout/**/*.{html,js,tsx}',
        './components/**/*.{html,js,tsx}',
    ],
    theme: {
        extend: {
            width,
            height,
            maxHeight,
            backgroundColor,
            screens
        },
        minWidth: {
            '12': '3rem',
        },
    },
    plugins: [],
}
