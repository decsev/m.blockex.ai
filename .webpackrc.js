export default {
    "entry": "src/index.js",
    "outputPath": "./wx",
    "disableCSSModules": true,
    "hash": false,
    "theme": {
        "@primary-color": "#1DA57A",
        "@link-color": "#1DA57A",
        "@border-radius-base": "2px",
        "@font-size-base": "16px",
        "@line-height-base": "1.2"
    },
    "sass": {
        "includePaths": ['src/assets/scss/'],
        "outputStyle": "compressed"
    },
    "extraBabelPlugins": [
        ["import", { "libraryName": "antd-mobile", "style": true }]
    ],
    "browserslist": [
        "> 1%",
        "Android >= 4",
        "iOS >= 8"
    ],
    "publicPath": "",
    "env": {
        "development": {
            "publicPath": "/"
        }
    },
    "proxy": {
        "/api/v1/*": {
            "target": "http://www.phix.cn",
            "changeOrigin": true,
            "pathRewrite": { "^/api/v1": "" }
        },
        "/api/v2/*": {
            "target": "http://api.phix.cn",
            "changeOrigin": true,
            "pathRewrite": { "^/api/v2" : "" }
        }
    }
}