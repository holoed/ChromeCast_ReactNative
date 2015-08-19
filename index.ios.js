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
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
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
    return {
      devices: [],
      url : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Big Buck Bunny (2008)",
      description: "Big Buck Bunny tells the story of a giant rabbit with a heart bigger " +
        "than himself. When one sunny day three rodents rudely harass him, something " +
        "snaps... and the rabbit ain't no bunny anymore! In the typical cartoon " +
        "tradition he prepares the nasty rodents a comical revenge.",
      imageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg" };
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
      this.state.url,
      this.state.title,
      this.state.description,
      this.state.imageUrl);
  },

  render: function() {
    var _this = this;
    return (
      <View style={styles.container}>
        <ScrollView>
         <View style={{paddingBottom: 200}}>
          <TouchableHighlight onPress={this.startScan}>
            <Text style={[styles.text, {marginTop:30}]}>
              Scan for devices
            </Text>
          </TouchableHighlight>
          <ScrollView contentInset={{top: -20}} style={{ width: 250, borderWidth: 0.5, borderColor: '#0f0f0f'}}>
           {(this.state.devices.length <=0) ?
             (<Text style={styles.welcome}>No devices available</Text>) :
             (this.state.devices.map((d, i) =>
               (<TouchableHighlight onPress={() => this.connectToDevice(d)}>
                  <Text style={styles.text}>{d}</Text>
                </TouchableHighlight>)))}
         </ScrollView>
          <WithLabel label="MP4">
            <TextInput
             style={styles.default}
             onChangeText={(text) => this.setState({url: text})}
             value={this.state.url}/>
          </WithLabel>
          <WithLabel label="Title">
            <TextInput
             style={styles.default}
             onChangeText={(text) => this.setState({title: text})}
             value={this.state.title}/>
          </WithLabel>
          <WithLabel label="Description">
            <TextInput
             multiline={true}
             style={[styles.default, { height: 150 }]}
             onChangeText={(text) => this.setState({description: text})}
             value={this.state.description}/>
          </WithLabel>
          <WithLabel label="Image Url">
            <TextInput
             style={styles.default}
             onChangeText={(text) => this.setState({imageUrl: text})}
             value={this.state.imageUrl}/>
          </WithLabel>
          <TouchableHighlight onPress={this.castVideo}>
            <Text style={styles.text}>
              Cast Video
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.disconnect}>
            <Text style={styles.text}>
              Disconnect
            </Text>
          </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
});

var WithLabel = React.createClass({
  render: function() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 13,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  default: {
    width: 250,
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  label: {
    width: 115,
    marginRight: 10,
    paddingTop: 2,
  },
  text: {
  color: '#007aff',
  fontFamily: '.HelveticaNeueInterface-MediumP4',
  fontSize: 17,
  margin: 10,
  width: 220,
  fontWeight: 'bold',
  textAlign: 'center',
},
});

AppRegistry.registerComponent('ChromeCastExperiments', () => ChromeCastExperiments);
