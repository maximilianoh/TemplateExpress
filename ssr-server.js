var http = require('http');
var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
let queryRepository = require('./backend/queryRepository.js');
const open = require('open');

(function() {
  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  const webpackConfigJs = require('./webpack.config.js');
  const config = webpackConfigJs({ "NODE_ENV": app.get('env') });
  const compiler = webpack(config);
  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    hot: true,
    stats: { colors: true },
    logLevel: 'warn', publicPath: config.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

// Do anything you like with the rest of your express application.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());
app.post('/getUser', function (req, res) {
  
  let commit = queryRepository.getUser();
  commit.then(data => {
    if (!data) throw data;
    return res.send(data);
  })
    .catch(e => {
      return res.status(404).send(e);
    })
});

app.use(express.static('pages'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html')
})
if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT, function() {
    console.log("Listening on %j", server.address());
    open('http://localhost:' + server.address().port);
  });
  process.on('SIGINT', function() {
    server.close(function(){
        process.exit();
    });
});
}
