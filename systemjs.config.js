/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  function mapIndex() {
    return {
      'app': 'app',
      '@angular': 'npm:@angular',
      'rxjs': 'npm:rxjs',
      'typescript': 'npm:typescript/lib/typescript.js' //add typescript map
    };
  }

  var ngPackages = ['core',
    'common',
    'compiler',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ];

  function mapUmd() {
    var map = {
      'app': 'app',
      'rxjs': 'npm:rxjs',
    };

    ngPackages.forEach(function (name) {
      map['@angular/' + name] = 'npm:@angular/' + name + '/bundles/' + name + '.umd.js';
    });

    return map;
  }

  System.packageWithIndex = 1;

  var packages = {
    app: {
      main: './main.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  };

  if (System.packageWithIndex) {
    ngPackages.forEach(function (name) {
      packages['@angular/' + name] = { main: 'index.js' };
    });
  }

  var config = {
    // paths serve as alias
    paths: {
      'npm:': 'node_modules/'
    },
    map: System.packageWithIndex ? mapIndex() : mapUmd(),
    // packages tells the System loader how to load when no filename and/or no extension
    packages: packages
  };

  if (System.packageWithIndex) {
    config['transpiler'] = 'typescript';
  }

  System.config(config);

  if (global.autoBootstrap) { bootstrap(); }

  // Bootstrap with a default `AppModule`
  // ignore an `app/app.module.ts` and `app/main.ts`, even if present
  // This function exists primarily (exclusively?) for the QuickStart
  function bootstrap() {
    console.log('Auto-bootstrapping');

    // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
    System.set(System.normalizeSync('app/main.ts'), System.newModule({}));

    // bootstrap and launch the app (equivalent to standard main.ts)
    Promise.all([
      System.import('@angular/platform-browser-dynamic'),
      getAppModule()
    ])
      .then(function (imports) {
        var platform = imports[0];
        var app = imports[1];
        platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
      })
      .catch(function (err) { console.error(err); });
  }

  // Make the default AppModule
  // returns a promise for the AppModule
  function getAppModule() {
    console.log('Making a bare-bones, default AppModule');

    return Promise.all([
      System.import('@angular/core'),
      System.import('@angular/platform-browser'),
      System.import('app/app.component')
    ])
      .then(function (imports) {

        var core = imports[0];
        var browser = imports[1];
        var appComp = imports[2].AppComponent;

        var AppModule = function () { }

        AppModule.annotations = [
          new core.NgModule({
            imports: [browser.BrowserModule],
            declarations: [appComp],
            bootstrap: [appComp]
          })
        ]
        return { AppModule: AppModule };
      })
  }
})(this);