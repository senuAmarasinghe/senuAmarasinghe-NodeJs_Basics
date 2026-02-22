// File System module
const fs = require('fs');
const http = require('http');

// 1. Read file example
console.log("=== Reading file ===");
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
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
});

// 3. Simple web server
console.log("\n=== Starting web server ===");
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js Lab Server</h1>');
    res.write('<p>Server is running successfully!</p>');
    res.end();
}).listen(8080);

console.log('Server running at http://localhost:8080/');
console.log('Press Ctrl+C to stop the server');