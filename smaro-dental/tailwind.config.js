const defaultTheme = require('tailwindcss/defaultTheme')
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
       screens: {
             'xs': '320px',
             ...defaultTheme.screens,
        },
        extend: {
            width:{
                dashboardSideBarWidth:'16.063rem'
            },
           colors:{
            'radon-blue-500':'#0D6EFD',
            'radon-blue-800':'#052C65',
            'radon-blue-900':'#031633',
            'radon-gray-300':'#DEE2E6',
            'radon-selection-color':'#003079'
           }
        },
    },
    plugins: [],
}

