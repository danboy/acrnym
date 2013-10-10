safe = require('./csrf');

module.exports = function(app, routes) {
  app.get('/', routes.Home.index);
  app.get('/users/new', safe.csrf, routes.Users.new);
  app.get('/profile', routes.Users.show);
  app.get('/roles', routes.Roles.index);
  app.post('/roles', routes.Roles.create);
  app.get('/organizations', routes.Organizations.index)
  app.get('/organizations/new', safe.csrf, routes.Organizations.new)
  app.get('/organizations/:id', routes.Organizations.show)
  app.post('/organizations', routes.Organizations.create)
}
