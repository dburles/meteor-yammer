Package.describe({
  summary: "Login service for Yammer accounts"
});

Package.on_use(function(api) {
  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Yammer');

  api.add_files(
    ['yammer_configure.html', 'yammer_configure.js'],
    'client');

  api.add_files('yammer_common.js', ['client', 'server']);
  api.add_files('yammer_server.js', 'server');
  api.add_files('yammer_client.js', 'client');
});
