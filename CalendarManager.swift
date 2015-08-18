//
//  CalendarManager.swift
//  ChromeCastExperiments
//
//  Created by Edmondo Pentangelo on 13/08/2015.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

import Foundation

// CalendarManager.swift

@objc(CalendarManager)
class CalendarManager: NSObject, GCKDeviceScannerListener, GCKDeviceManagerDelegate {
  
  private var selectedDevice: GCKDevice?
  private var deviceManager: GCKDeviceManager?
  private var deviceScanner: GCKDeviceScanner
  
  private lazy var kReceiverAppID:String = {
    //You can add your own app id here that you get by registering with the
    // Google Cast SDK Developer Console https://cast.google.com/publish
    return kGCKMediaDefaultReceiverApplicationID
    }()

  private var devices: [GCKDevice] = [];
  var events : [String] = [];
  
  // Required init.
  required override init() {
    let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID:
      kGCKMediaDefaultReceiverApplicationID)
    deviceScanner = GCKDeviceScanner(filterCriteria:filterCriteria)
  }

  @objc func initialize() -> Void {
    //events.append("init");
    
    dispatch_async(dispatch_get_main_queue(), { [unowned self] in
      // Initialize device scanner
      self.deviceScanner.addListener(self)
      self.deviceScanner.startScan()
    })
  }
  
  @objc func addEvent(name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
    //events.append(name);
    
    for device in deviceScanner.devices  {
      events.append(device.friendlyName)
      devices.append(device as! GCKDevice);
    }
  }
  
  @objc func getEventName(successCallback: RCTResponseSenderBlock) -> Void {
    
    let resultsDict = [
      "Msg"  : events
    ];
    
    successCallback([resultsDict]);
  }
  
  @objc func connectToDevice() -> Void {
    if (devices.count <= 0) {
      return
    }
    dispatch_async(dispatch_get_main_queue(), { [unowned self] in
      
      self.selectedDevice = self.devices[0]
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
  
  func deviceManagerDidConnect(deviceManager: GCKDeviceManager!) {
    println("Connected.")
    dispatch_async(dispatch_get_main_queue(), { [unowned self] in
      self.deviceManager!.launchApplication(self.kReceiverAppID)
    })
  }
  
}