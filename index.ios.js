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
  NativeModules
} = React;

var ChromeCastExperiments = React.createClass({

  getInitialState: function() {
    return { devices: [] };
  },

  initialize: function() {
    var _this = this;
    NativeModules.ChromecastManager.initialize(function (result) {
      console.log(result);
      _this.setState({ devices: result.Msg })
    });
  },

  connectToDevice: function() {
    NativeModules.ChromecastManager.connectToDevice();
  },

  disconnect: function() {
    NativeModules.ChromecastManager.disconnect();
  },

  castVideo: function() {
    NativeModules.ChromecastManager.castVideo("http://192.168.0.19/Movies/Fun%20with%20Dick%20and%20Jane.mp4");
  },

  render: function() {
    var _this = this;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.initialize}>
          <Text style={styles.welcome}>
            Create Device Scanner
          </Text>
        </TouchableHighlight>
        {
          this.state.devices.map(function(d, i) {
            return (
              <TouchableHighlight onPress={_this.connectToDevice}>
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
