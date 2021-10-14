module.exports = {
    purge: {
        enabled: true,
        content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                newtransparent: {
                    blue: '#3d5af140',
                    white: '#0000000f',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
