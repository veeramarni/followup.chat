Package.describe({
  name: 'followupchat:lib',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('aldeed:collection2');
  api.use('veeramarni:logger');
  api.use('veeramarni:common');
  api.use('followupchat:version');
  api.use('veeramarni:touchstonejs');
  api.addFiles('lib/core.js');
  api.addFiles('lib/models/_Base.js');

  // SERVER

  // VERSION
  api.addFiles('followupchat.info');

  // EXPORT
  api.export('FollowupChat');
});

