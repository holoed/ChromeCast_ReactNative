//
//  ChromecastManagerBridge.m
//  ChromeCastExperiments
//
//  Created by Edmondo Pentangelo on 13/08/2015.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

// ChromecastManagerBridge.m
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ChromecastManager, NSObject)

RCT_EXTERN_METHOD(initialize:(RCTResponseSenderBlock *)successCallback)

RCT_EXTERN_METHOD(connectToDevice)

RCT_EXTERN_METHOD(disconnect)

RCT_EXTERN_METHOD(castVideo: (NSString *)videoUrl)

@end