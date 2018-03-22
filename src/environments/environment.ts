// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBtjIqkK3dkAWUAMR_g-cp-l-6JxElzUGo',
    authDomain: 'ng-fitness-tracker-9f998.firebaseapp.com',
    databaseURL: 'https://ng-fitness-tracker-9f998.firebaseio.com',
    projectId: 'ng-fitness-tracker-9f998',
    storageBucket: 'ng-fitness-tracker-9f998.appspot.com',
    messagingSenderId: '1033360102704'
  }
};
