
## Getting Started

* Want to use TypeScript? Both the `master` branch and the `typescript` branch now use TypeScript.
* Run `npm install` from the project root.
* Install the ionic CLI (`npm install -g ionic`)
* Run `ionic serve` in a terminal from the project root.
* Profit

**Note:** Is your build slow? Update `npm` to 3.x: `npm install -g npm`.


=====================================================================================================================

## Using following npm libraries  in traco health project

    "@ionic-native/android-permissions": "^4.12.2",
    "@ionic-native/app-rate": "^4.5.3",
    "@ionic-native/camera": "^4.12.0",
    "@ionic-native/clipboard": "^4.3.2",
    "@ionic-native/core": "~4.10.0",
    "@ionic-native/device": "^4.5.3",
    "@ionic-native/device-accounts": "^4.5.3",
    "@ionic-native/email-composer": "^4.5.3",
    "@ionic-native/facebook": "^4.3.2",
    "@ionic-native/fcm": "^4.5.2",
    "@ionic-native/file": "^4.7.0",
    "@ionic-native/file-transfer": "^4.7.0",
    "@ionic-native/geolocation": "^4.11.0",
    "@ionic-native/google-maps": "^4.5.3",
    "@ionic-native/image-picker": "^4.12.0",
    "@ionic-native/image-resizer": "^4.12.0",
    "@ionic-native/in-app-browser": "4.11.0",
    "@ionic-native/network": "^4.11.0",
    "@ionic-native/photo-viewer": "^4.3.1",
    "@ionic-native/sms": "^4.12.2",
    "@ionic-native/social-sharing": "^4.7.0",
    "@ionic-native/splash-screen": "4.10.0",
    "@ionic-native/status-bar": "4.10.0",


if above not included in your project thann write following command :

npm install --save "plugin_name"

for example this way ->
npm install --save @ionic-native/android-permissions


=====================================================================================================================

## Deploying

* PWA - Un-comment [this](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L17), run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Android - Run `ionic cordova run android --prod`
* iOS - Run `ionic cordova run ios --prod`

## File Structure of App