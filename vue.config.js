module.exports = {
    transpileDependencies: ["vuetify"],
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    lintOnSave: true,
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== "production",
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint')
    },


};
