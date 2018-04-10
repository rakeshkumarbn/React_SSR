import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer.js';
import createStore from './helpers/createStore.js';

const app = express();

app.use(
      '/api',
      proxy('http://react-ssr-api.herokuapp.com',{
        proxyReqOptDecorator(opts){
          opts.header['x-forward-host'] = 'localhost:3000';
          return opts;
        }
      })
);

app.use(express.static('public'));
app.use(express.static('assets'));
app.get('*', (req, res) => {
  const store = createStore();
  //Some logic to initialize and load data into store
  const promises = matchRoutes(Routes, req.path).map( ({ route }) => {
      return route.loadData ? route.loadData(store) : null;
  });

Promise.all( promises).then(( ) => {
    res.send(renderer(req, store));
});

});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
