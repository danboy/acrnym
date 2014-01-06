var express = require('express')
  , controllers = require('./lib/controllers')
  , cluster = require('cluster')
  , http = require('http')
  , path = require('path')
  , everyauth = require('everyauth')
  , MongoStore = require('connect-mongo')(express)
  , mongoose    = require('mongoose')
  , numCPUs = require('os').cpus().length;

require('mongoose-cache').install(mongoose, {
  max: 50
, maxage: 120000
});
var app = express();
app.db = ('development' == app.get('env')) ? 'mongodb://localhost/acrnym' : 'mongodb://localhost/acrnym';
mongoose.connect(app.db);

auth = require('./lib/auth.js').init(everyauth);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon())
  .use(express.logger('dev'))
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(express.cookieParser('James 007 Bond'))
  .use(express.session({
      secret: 'egg mcMuffin'
    , store: new MongoStore({
        db: mongoose.connections[0].db
      })
    }))
  .use(express.csrf())
  .use(everyauth.middleware())
  .use(express.static(path.join(__dirname, 'public')))
  .use(require('connect-assets')({jsCompilers: require('./lib/jade-assets')}))
  .use(app.router);

app.locals.css = css
app.locals.js = js

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Code to run if we're in the master process
if (cluster.isMaster) {

  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
  cluster.fork();
}

// Code to run if we're in a worker process
} else {
  require('./lib/routes')(app, controllers)
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port')+' (Worker ' + cluster.worker.id + ' running)' );
  });
}
