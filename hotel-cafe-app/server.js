const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8001;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    // Default to index.html for root
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Security: prevent directory traversal
    const realPath = fs.realpathSync(__dirname);
    if (!fs.realpathSync(filePath).startsWith(realPath)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<!DOCTYPE html><html><body><h1>404 - File Not Found</h1><p>The requested file was not found.</p></body></html>');
        } else {
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            
            switch(ext) {
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.gif':
                    contentType = 'image/gif';
                    break;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`
    ╔════════════════════════════════════════════╗
    ║  Hotel & Café Management System Server     ║
    ╚════════════════════════════════════════════╝
    
    ✅ Server is running!
    🌐 URL: http://${HOST}:${PORT}
    📂 Directory: ${__dirname}
    
    Press Ctrl+C to stop the server
    `);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n✅ Server stopped gracefully');
    process.exit(0);
});
