// File System module
const fs = require('fs');
const http = require('http');
const path = require('path');

// 1. Read file example
console.log("=== Reading file ===");
const filePath = path.join(__dirname, 'file.txt');

// Ensure the file exists so the example runs successfully
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Sample content created by app.js\n', 'utf8');
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// 2. Write to file example
console.log("\n=== Writing to file ===");
fs.writeFile(path.join(__dirname, 'output.txt'), 'This was created by Node.js!', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File saved successfully!');
});

// 3. Simple web server
console.log("\n=== Starting web server ===");
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Node.js Lab Server</h1>');
    res.write('<p>Server is running successfully!</p>');
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log('Press Ctrl+C to stop the server');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please specify a different PORT environment variable or stop the process using this port.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});