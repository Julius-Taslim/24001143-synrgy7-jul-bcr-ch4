const path = require('path');
const fs = require('fs');
const http = require('http');

const PUBLIC_DIR = path.join(__dirname, '../public');
const NODE_DIR = path.join(__dirname, '../node_modules');

const onRequest = (req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            serveFile(res, 'html/mainPage.html', 'text/html');
        } else if (req.url === '/search') {
            serveFile(res, 'html/cariMobil.html', 'text/html');
        } else if (req.url.startsWith('/scripts/') || req.url.startsWith('/css/') || req.url.startsWith('/images/') || req.url.startsWith('/node_modules/')) {
            serveStaticFile(req, res);
        } else {
            res.writeHead(404);
            res.end('Page not found');
        }
    } else {
        res.writeHead(405);
        res.end('Method not allowed');
    }
};

const serveFile = (res, filePath, contentType) => {
    fs.readFile(path.join(PUBLIC_DIR, filePath), (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading file');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

const serveStaticFile = (req, res) => {
    const extname = String(path.extname(req.url)).toLowerCase();
    const mimeTypes = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    const filePath = req.url.startsWith('/node_modules/') 
                     ? path.join(NODE_DIR, req.url.replace('/node_modules/', '')) 
                     : path.join(PUBLIC_DIR, req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

const server = http.createServer(onRequest);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
