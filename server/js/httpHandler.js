const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET'){
    //console.log('received request')
    // let choices = ['up','down','left','right'];
    // let pos = Math.floor(Math.random() * 4);
    res.writeHead(200, headers);
    console.log('hi', messages.messages)
    //console.log(nextCommand)
    if (messages.messages.length > 0) {
      console.log(messages)
      res.write(messages.dequeue())
    }
    res.end();
  }
  res.writeHead(200, headers);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
