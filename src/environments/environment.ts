/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyABN7HaigdqFPQx9un5pngBD7w6w2Cz5_E",
    authDomain: "gazapp-4e160.firebaseapp.com",
    databaseURL: "https://gazapp-4e160.firebaseio.com",
    projectId: "gazapp-4e160",
    storageBucket: "gazapp-4e160.appspot.com",
    messagingSenderId: "239118239090"
  }
};
