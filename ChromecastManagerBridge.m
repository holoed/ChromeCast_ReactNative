//
//  ChromecastManagerBridge.m
//  ChromeCastExperiments
//
//  Created by Edmondo Pentangelo on 13/08/2015.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

// ChromecastManagerBridge.m
#import "RCTEventDispatcher.h"
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ChromecastManager, NSObject)

RCT_EXTERN_METHOD(startScan)

RCT_EXTERN_METHOD(connectToDevice: (NSString *) deviceName)

RCT_EXTERN_METHOD(disconnect)

RCT_EXTERN_METHOD(castVideo: (NSString *)videoUrl title:(NSString *)title
                                                  description:(NSString *)description
                                                  imageUrl:(NSString *)imageUrl)

RCT_EXTERN_METHOD(play)

RCT_EXTERN_METHOD(pause)

RCT_EXTERN_METHOD(getStreamPosition: (RCTResponseSenderBlock *)successCallback)

RCT_EXTERN_METHOD(seekToTime: (double) time)

@end