// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //url: 'https://infinityhn.net/PasarelaInet/api/',
  //url: 'https://infinityhn.net/api/',
  url: 'https://localhost:5001/api/',
  tpUrl: 'https://preprod-api.todopago.hn/pay',
  tpUser: '0501-9012-46995512',
  tpPassword: '123456'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
