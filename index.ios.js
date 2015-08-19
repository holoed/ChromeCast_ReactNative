/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules,
  DeviceEventEmitter
} = React;

var ChromeCastExperiments = React.createClass({

  componentDidMount: function() {
    DeviceEventEmitter.addListener('DeviceListChanged', this._deviceListChangedHandler);
  },

  componentWillUnmount: function() {
    DeviceEventEmitter.removeListener('DeviceListChanged', this._deviceListChangedHandler);
  },

  _deviceListChangedHandler: function (data) {
    console.log(data);
    this.setState({ devices: data.Devices })
  },

  getInitialState: function() {
    return { devices: [] };
  },

  startScan: function() {
    NativeModules.ChromecastManager.startScan();
  },

  connectToDevice: function(deviceName) {
    NativeModules.ChromecastManager.connectToDevice(deviceName);
  },

  disconnect: function() {
    NativeModules.ChromecastManager.disconnect();
  },

  castVideo: function() {
    NativeModules.ChromecastManager.castVideo(
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "Big Buck Bunny (2008)",
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger " +
        "than himself. When one sunny day three rodents rudely harass him, something " +
        "snaps... and the rabbit ain't no bunny anymore! In the typical cartoon " +
        "tradition he prepares the nasty rodents a comical revenge.",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg");
  },

  render: function() {
    var _this = this;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.startScan}>
          <Text style={styles.welcome}>
            Scan for devices
          </Text>
        </TouchableHighlight>
        {
          this.state.devices.map(function(d, i) {
            return (
              <TouchableHighlight onPress={() => _this.connectToDevice(d)}>
                <Text>{d}</Text>
             </TouchableHighlight>);
          })
        }
        <TouchableHighlight onPress={this.castVideo}>
          <Text style={styles.welcome}>
            Cast Video
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.disconnect}>
          <Text style={styles.welcome}>
            Disconnect
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ChromeCastExperiments', () => ChromeCastExperiments);
