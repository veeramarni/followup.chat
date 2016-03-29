Package.describe({
    name: 'followupchat:ui',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.use( ['ecmascript','modules','less'] );
    api.use([
        'webpack:core-config@1.0.0',
        'followupchat:lib',
        'webpack:react',
        'webpack1:sass',
        'webpack:less',
        'webpack:css'
    ]);

    api.add_files(['webpack.config.js']);
    api.mainModule('client-components.js', 'client');

    api.addFiles('./styles/components.import.less', 'client');
});

