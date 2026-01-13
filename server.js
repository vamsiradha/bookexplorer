const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  console.log(req.method + ' ' + req.url);

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Book Explorer</h1><p>Working!</p>');
  }
  
  else if (req.url === '/api/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'OK', time: new Date().toISOString()}));
  }
  
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 - Not Found');
  }
});

server.listen(PORT, function() {
  console.log('Server running on port', PORT);
});