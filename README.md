# ChromeCast_ReactNative

Sample app showing Chromecast IOS API used from React-Native JavaScript

![Alt text](/docs/Screenshot.png?raw=true "Screenshot")

## Dependencies
* CocoaPods - dependencies are managed via CocoaPods. See http://guides.cocoapods.org/using/getting-started.html for setup instructions.
* ReactNative - See https://facebook.github.io/react-native/docs/getting-started.html for setup instructions.

## Setup Instructions
* Install React-Native - npm install -g react-native-cli
* Install CocoaPods - sudo gem install cocoapods
* git clone https://github.com/holoed/ChromeCast_ReactNative.git
* cd ChromeCast_ReactNative/
* pod install
* npm install
* open ChromeCastExperiments.xcworkspace with XCode
* Build and run (using IPhone device or simulator)
* Once the app is running, click on "Scan for Devices" to locate your active Chromecast devices.
* Click on the ChromeCast device name you want to cast the video, to connect to it. (ex. "Living Room")
* Enter the video details in the boxes or just use the default. (Big Buck Bunny)
* Click "Cast Video" to start playing the Video on the Chromecast.
* Click "Disconnect" when you like to stop the video and disconnect from the Chromecast.

## TODOS

- [ ] Create package for npmjs
- [ ] Seek to time interval
- [ ] Pause, resume, stop
- [ ] Report current video time 
- [ ] Add to react.parts

## License
See [LICENSE](LICENSE)

