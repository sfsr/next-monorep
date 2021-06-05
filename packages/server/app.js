const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const MobileDetect = require('mobile-detect');
const { createServer } = require('http');

const buildUrl = (port) => `${process.env.URL || 'http://localhost'}:${port}`;

createServer((req, res) => {
  const md = new MobileDetect(req.headers['user-agent']);
  const target = md.mobile() ? buildUrl('9009') : buildUrl('9008');
  proxy.web(req, res, {
    target: target,
  });
  console.log(`DEBUG: routing to ${target}`);
}).listen(8008);
