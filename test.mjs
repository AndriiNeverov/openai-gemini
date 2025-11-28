
import { createServer } from 'node:http'
import compression from 'compression'; // Import the compression middleware
import express from 'express'; // You might use Express to easily apply middleware



function createServer2 (fn) {
  return createServer(function (req, res) {
// threshold is for how many bytes to wait, i.e. curl would hang
    compression({ threshold: 0 }) (req, res, function (err) {
      if (err) {
        res.statusCode = err.status || 500
        res.end(err.message)
        return
      }

      fn(req, res)
    })
  })
}

var server = createServer2(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world!')
})

server.listen(3000, () => {
  console.log('> Listening at http://localhost:3000')
})