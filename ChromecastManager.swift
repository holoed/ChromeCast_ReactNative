//
//  ChromecastManager.swift
//  ChromeCastExperiments
//
//  Created by Edmondo Pentangelo on 13/08/2015.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

import Foundation

// ChromecastManager.swift

@objc(ChromecastManager)
class ChromecastManager: NSObject, GCKDeviceScannerListener, GCKDeviceManagerDelegate, GCKMediaControlChannelDelegate {

  private var selectedDevice: GCKDevice?
  private var deviceManager: GCKDeviceManager?
  private var deviceScanner: GCKDeviceScanner
  private var mediaControlChannel: GCKMediaControlChannel?
  
  private var successCallback: RCTResponseSenderBlock?

  private lazy var kReceiverAppID:String = {
    //You can add your own app id here that you get by registering with the
    // Google Cast SDK Developer Console https://cast.google.com/publish
    return kGCKMediaDefaultReceiverApplicationID
    }()

  private var devices: Dictionary<String, GCKDevice> = Dictionary<String, GCKDevice>()

  // Required init.
  required override init() {
    let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID:
      kGCKMediaDefaultReceiverApplicationID)
    deviceScanner = GCKDeviceScanner(filterCriteria:filterCriteria)
  }

  @objc func initialize(successCallback: RCTResponseSenderBlock) -> Void {
    
    self.successCallback = successCallback;
    dispatch_async(dispatch_get_main_queue(), { [unowned self] in
      // Initialize device scanner
      self.deviceScanner.addListener(self)
      self.deviceScanner.startScan()
    })
  }

  @objc func connectToDevice() -> Void {
    if (devices.count <= 0) {
      return
    }
    dispatch_async(dispatch_get_main_queue(), { [unowned self] in

      self.selectedDevice = self.devices.values.first;
      let identifier = NSBundle.mainBundle().infoDictionary?["CFBundleIdentifier"] as! String
      self.deviceManager = GCKDeviceManager(device: self.selectedDevice, clientPackageName: identifier)
      self.deviceManager!.delegate = self
      self.deviceManager!.connect()
    })
  }

  @objc func disconnect() -> Void {
    if (self.deviceManager == nil) {
      return
    }
    dispatch_async(dispatch_get_main_queue(), { [unowned self] in
      // Disconnect button.
      self.deviceManager!.leaveApplication()
      self.deviceManager!.disconnect()
    })
  }

  @objc func castVideo(videoUrl: String) -> Void {
    println("Cast Video")

    // Show alert if not connected.
    if (deviceManager?.connectionState != GCKConnectionState.Connected) {
      println("Not connected to device");
      return
    }

    // [START media-metadata]
    // Define Media Metadata.
    let metadata = GCKMediaMetadata()
    metadata.setString("Big Buck Bunny (2008)", forKey: kGCKMetadataKeyTitle)
    metadata.setString("Big Buck Bunny tells the story of a giant rabbit with a heart bigger " +
      "than himself. When one sunny day three rodents rudely harass him, something " +
      "snaps... and the rabbit ain't no bunny anymore! In the typical cartoon " +
      "tradition he prepares the nasty rodents a comical revenge.",
      forKey:kGCKMetadataKeySubtitle)

    let url = NSURL(string:"https://commondatastorage.googleapis.com/gtv-videos-bucket/" +
      "sample/images/BigBuckBunny.jpg")
    metadata.addImage(GCKImage(URL: url, width: 480, height: 360))
    // [END media-metadata]

    // [START load-media]
    // Define Media Information.
    let mediaInformation = GCKMediaInformation(
      contentID: videoUrl,
      streamType: GCKMediaStreamType.None,
      contentType: "video/mp4",
      metadata: metadata,
      streamDuration: 0,
      mediaTracks: [],
      textTrackStyle: nil,
      customData: nil
    )

    dispatch_async(dispatch_get_main_queue(), { [unowned self] in
      // Cast the media
      self.mediaControlChannel!.loadMedia(mediaInformation, autoplay: true)
    })
  }

  func deviceManagerDidConnect(deviceManager: GCKDeviceManager!) {
    println("Connected.")
    dispatch_async(dispatch_get_main_queue(), { [unowned self] in
      self.deviceManager!.launchApplication(self.kReceiverAppID)
    })
  }

  func deviceManager(deviceManager: GCKDeviceManager!,
    didConnectToCastApplication
    applicationMetadata: GCKApplicationMetadata!,
    sessionID: String!,
    launchedApplication: Bool) {
      println("Application has launched.")
      self.mediaControlChannel = GCKMediaControlChannel()
      mediaControlChannel!.delegate = self
      deviceManager.addChannel(mediaControlChannel)
      mediaControlChannel!.requestStatus()
  }
  
  func deviceDidComeOnline(device: GCKDevice!) {
    println("Device found: \(device.friendlyName)")
    devices[device.friendlyName] = device;
    
    self.successCallback?([[
      "Msg"  : devices.keys.array
      ]]);
  }
  
  func deviceDidGoOffline(device: GCKDevice!) {
    println("Device went away: \(device.friendlyName)")
    devices.removeValueForKey(device.friendlyName);
    
    self.successCallback?([[
      "Msg"  : devices.keys.array
      ]]);
  }

}
