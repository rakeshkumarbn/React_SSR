import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer.js';
import createStore from './helpers/createStore.js';
import spdy from 'spdy';
import fs from 'fs';

const tlsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  spdy: {
    plain: false,
    ssl: true
  }
}

const app = express();


app.use(express.static('public'));
app.use(express.static('assets'));


function readFiles () {
  const files = [
    'public/bundle.js',
    'assets/images/IMAGE1.jpg',
    'assets/images/IMAGE2.jpg'
  ]
  return files.map(name => fs.readFile(name))
}

function pushFile (path, contents, options, res) {
  const stream = res.push(path, options)
  stream.on('error', console.error)
  stream.end(contents)
}

const imageOptions = {
  req: {accept: 'image/*'},
  res: {'content-type': 'image/jpeg'}
}


app.get('*', (req, res) => {
  const store = createStore();
  //Some logic to initialize and load data into store
  //res.push('../public/bundle.js');
//   res.push('bundle.js',headers, function(err, stream){
//                   if (err){
//                     console.log(err);
//                     return;
//                   }
//                     stream.end(bundle);
// });

const homePageWithPush = files => {
  if (res.push) {
    console.log('browser supports HTTP/2 Push!!!', 'is SPDY?', req.isSpdy, 'spdy version', req.spdyVersion)
    pushFile('/images/IMAGE1.jpg', files[1], imageOptions, res)
    pushFile('/images/IMAGE2.jpg', files[2], imageOptions, res)
  }
  else {
    console.log('No HTTP/2 Push :(, is page secure?',   req.secure, 'is SPDY?', req.isSpdy)
  }

  // index.html is the first file
  //res.writeHead(200)
  res.send(renderer(req, store));
}

// we could also read all files at startup
Promise.all(readFiles())
  .then(homePageWithPush)
  .catch(error => res.status(500).send(error.toString()))

});


spdy.createServer(tlsOptions, app).listen(8010, err => {
  if (err) {
    throw new Error(err)
  }
  console.log('listening on port 8010')
})
