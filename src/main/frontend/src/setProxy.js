const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
            logLevel: 'debug',
            timeout: 5000, // 5초 대기
            proxyTimeout: 5000, // 백엔드 응답 대기 시간
        })
    );
};