const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, res) => {
  const myURL = new URL(request.url, 'http://localhost:8080');

  const files = {
    '/': 'index.html',
    '/about': 'about.html',
    '/contact-me': 'contact-me.html'
  };
  const fileName = files[myURL.pathname];

  const errorFileName = '404.html';

  if (!fileName) {
    fs.readFile(path.join(__dirname, errorFileName), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error: Could not read error file');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  fs.readFile(path.join(__dirname, fileName), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error: Could not read file');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(8080);

