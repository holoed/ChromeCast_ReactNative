//
//  CalendarManagerBridge.m
//  ChromeCastExperiments
//
//  Created by Edmondo Pentangelo on 13/08/2015.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

// CalendarManagerBridge.m
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(initialize)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSNumber *)date)

RCT_EXTERN_METHOD(getEventName:(RCTResponseSenderBlock *)successCallback)

RCT_EXTERN_METHOD(connectToDevice)

RCT_EXTERN_METHOD(disconnect)

@end