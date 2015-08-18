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
    NativeModules.CalendarManager.initialize();
  },

  addDevicesToList: function() {
    NativeModules.CalendarManager.addEvent(
            'Birthday Party',
            '4 Privet Drive, Surrey',
            42);
  },

  getDevicesNames: function() {
    var _this = this;
    NativeModules.CalendarManager.getEventName(function (x) {
      console.log(x);
      _this.setState({ devices: x.Msg })
    });
  },

  connectToDevice: function() {
    NativeModules.CalendarManager.connectToDevice();
  },

  disconnect: function() {
    NativeModules.CalendarManager.disconnect();
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
        <TouchableHighlight onPress={this.addDevicesToList}>
          <Text style={styles.welcome}>
            Add Devices to list
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.getDevicesNames}>
          <Text style={styles.welcome}>
            Get Devices list
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
