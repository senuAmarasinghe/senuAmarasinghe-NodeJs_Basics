const fs = require('fs');
const http = require('http');

// Helper function to find available port
function findAvailablePort(startPort, callback) {
    const server = http.createServer();
    server.listen(startPort, () => {
        const port = server.address().port;
        server.close(() => callback(port));
    });
    server.on('error', () => {
        findAvailablePort(startPort + 1, callback);
    });
}

// 1. Read file example
console.log("=== Reading file ===");
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Creating sample file first...');
        fs.writeFileSync('file.txt', 'Hello from Node.js lab! This is a sample text file.');
        console.log('Sample file created. Please run the program again.');
        return;
    }
    console.log('File content:', data);
});

// 2. Write to file example
console.log("\n=== Writing to file ===");
fs.writeFile('output.txt', 'This was created by Node.js!', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File saved successfully!');
    
    // Read back the file to verify
    fs.readFile('output.txt', 'utf8', (err, data) => {
        if (!err) {
            console.log('Content written:', data);
        }
    });
});

// 3. Web server with automatic port selection
console.log("\n=== Starting web server ===");
findAvailablePort(3000, (port) => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Node.js Lab Server</h1>');
        res.write('<p>Server is running successfully!</p>');
        res.write(`<p>Using port: ${port}</p>`);
        res.end();
    });
    
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
        console.log('Press Ctrl+C to stop the server');
    });
});