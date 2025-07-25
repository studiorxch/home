module.exports = {
    multipass: true,
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    // Keep essential visual structure
                    removeViewBox: false,
                    removeUnknownsAndDefaults: false,
                    cleanupIDs: false,
                },
            },
        },
        'removeDimensions', // Let viewBox control scaling
        {
            name: 'convertColors',
            params: {
                currentColor: false,
                names2hex: true,
                rgb2hex: true,
            },
        },
        {
            name: 'sortAttrs',
            params: {
                xmlnsOrder: 'alphabetical',
            },
        },
        {
            name: 'removeAttrs',
            params: {
                attrs: '(stroke|fill-opacity|opacity)',
            },
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [
                    { fill: '#EBEBEB' },
                ],
            },
        },
    ],
};
