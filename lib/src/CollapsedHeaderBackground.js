import * as React from 'react';
import { Animated, View } from 'react-native';
import { getElevationStyle } from './utils';
var CollapsedHeaderBackground = function (_a) {
    var translateY = _a.translateY, opacity = _a.opacity, backgroundColor = _a.backgroundColor, collapsedColor = _a.collapsedColor, elevation = _a.elevation;
    return function () { return (<Animated.View style={{ flex: 1, transform: [{ translateY: translateY }] }}>
    <View style={[
        {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: collapsedColor || backgroundColor,
        },
        elevation != null ? getElevationStyle(elevation) : null,
    ]}/>
    <Animated.View style={{
        backgroundColor: backgroundColor,
        flex: 1,
        opacity: opacity,
        elevation: elevation,
    }}/>
  </Animated.View>); };
};
export { CollapsedHeaderBackground };
