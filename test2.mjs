import { createServerAdapter } from '@whatwg-node/server'
import { createServer } from 'node:http'
import compression from 'compression'; // Import the compression middleware
import express from 'express'; // You might use Express to easily apply middleware
import worker from "./src/worker.mjs";
import zlib  from 'zlib';

  const port = 1234; //+(process.env.PORT || 8080);

const serverAdapter = createServerAdapter(worker.fetch)



createServer(function(request, response) {
  var acceptEncoding = request.headers['accept-encoding'];
  if (!acceptEncoding) {
    acceptEncoding = '';
  }

  // Note: this is not a conformant accept-encoding parser.
  // See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
  if (acceptEncoding.match(/\bdeflate\b/)) {
    response.writeHead(200, { 'content-encoding': 'deflate' });
    raw.pipe(zlib.createDeflate()).pipe(response);
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    response.writeHead(200, { 'content-encoding': 'gzip' });
    raw.pipe(zlib.createGzip()).pipe(response);
  } else {
    response.writeHead(200, {});
    raw.pipe(response);
  }
}).listen(port, "127.0.0.1", () => {
  console.log('Listening on:', server.address());
});