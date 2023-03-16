
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReactNativeHaloUiSpec.h"

@interface ReactNativeHaloUi : NSObject <NativeReactNativeHaloUiSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ReactNativeHaloUi : NSObject <RCTBridgeModule>
#endif

@end
