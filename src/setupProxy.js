//@ts-ignore
const { createProxyMiddleware  } = require('http-proxy-middleware');

module.exports = (app)=> {
    app.use(createProxyMiddleware ('/api', {
        target: 'http://172.16.13.63:5000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/"
        }
    }))
};