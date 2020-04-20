//@ts-ignore
const { createProxyMiddleware  } = require('http-proxy-middleware');

module.exports = (app)=> {
    app.use(createProxyMiddleware ('/api', {
        target: 'http://0.0.0.0:5000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/"
        }
    }))
};