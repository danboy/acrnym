m = require('./middleware');

module.exports = function(app, routes) {
  app.get('*', m.populateLocals);
  app.get('/', routes.Home.index);
  app.get('/users/new', m.csrf, routes.Users.new);
  app.get('/users', routes.Users.index);
  app.get('/profile', routes.Users.show);
  app.get('/roles', routes.Roles.index);
  app.post('/roles', routes.Roles.create);
  app.get('/organizations', routes.Organizations.index)
  app.get('/organizations/new', m.csrf, m.isAllowed, routes.Organizations.new)
  app.get('/organizations/:id/edit', m.csrf, m.isAllowed, routes.Organizations.edit)
  app.get('/organizations/:id/users', m.csrf, routes.Organizations.users.index)
  app.post('/organizations/:id/users', m.csrf, routes.Organizations.users.create)
  app.get('/organizations/:id', m.csrf, routes.Organizations.show)
  app.post('/organizations', m.isAllowed, routes.Organizations.create)
  app.post('/organizations/edit', m.isAllowed, routes.Organizations.update)
  app.post('/projects', m.csrf, m.isAllowed, routes.Projects.create);
  app.get('/projects/:id/edit', m.csrf, m.isAllowed, routes.Projects.edit);
  app.post('/projects/:id/edit', m.csrf, m.isAllowed, routes.Projects.update);
  app.get('/projects/:id', m.csrf, m.isAllowed, routes.Projects.show);
  app.del('/projects/:id', m.csrf, m.isAllowed, routes.Projects.destroy);
  app.get('/stories/:id/edit', m.csrf, m.isAllowed, routes.Stories.edit);
  app.post('/stories/:id/edit', m.csrf, m.isAllowed, routes.Stories.update);
  app.post('/stories', m.csrf, m.isAllowed, routes.Stories.create);
  app.post('/metrics', m.csrf, m.isAllowed, routes.Metrics.create);
  app.del('/metrics/:id', m.csrf, m.isAllowed, routes.Metrics.destroy);
  app.get('/objectives/new', m.csrf, m.isAllowed, routes.Objectives.new);
  app.get('/objectives/:id', m.csrf, m.isAllowed, routes.Objectives.show);
  app.post('/objectives', m.csrf, m.isAllowed, routes.Objectives.create);
}
