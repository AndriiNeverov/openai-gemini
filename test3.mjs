import { createServerAdapter } from '@whatwg-node/server'
import { createServer } from 'node:http'
import compression from 'compression'; // Import the compression middleware
import express from 'express'; // You might use Express to easily apply middleware
import zlib  from 'zlib';

import worker from "./src/worker.mjs";

const port = 1234; //+(process.env.PORT || 8080);

const serverAdapter = createServerAdapter(worker.fetch)

var server = createServer(async function (req, res) {
  //res.writeHead(200, { 'content-encoding': 'gzip' });
  const t = await worker.fetch(req);
console.log(t);
//  var inflated = zlib.inflateSync(Buffer.from(deflated)).toString();
  res.end(t)
})

server.listen(port, "127.0.0.1", () => {
  console.log('Listening on:', server.address());
})
