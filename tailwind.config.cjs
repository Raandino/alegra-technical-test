// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#EBFAFA',
                    100: '#D4F2F1',
                    200: '#B4ECEE',
                    300: '#A0E4E2',
                    400: '#86DFDC',
                    500: '#00B39D',
                    600: '#0A9E9A',
                    700: '#00635E',
                    800: '#006A65',
                    900: '#005452',
                },
                neutral: {
                    10: '#F4F5FB',
                    20: '#64748B',
                    30: '#47536B',
                    40: '#334155',
                    50: '#0F172A',
                },
            },
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
