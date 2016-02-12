Package.describe({
  name: 'followupchat:version',
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
  api.use('isobuild:compiler-plugin@1.0.0');

});

Package.registerBuildPlugin({
  name: "app-version",
  sources: ['plugin/compile-version.js']
});
