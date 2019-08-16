const express = 'express';

const server = express();


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

var timestamp = date.getTime();

function logger(req, res, next) {
  console.log('request method', req.method)
  console.log('request url', req.url)
  console.log('time:', timestamp )
  next();
};

server.use(logger);



module.exports = server;
