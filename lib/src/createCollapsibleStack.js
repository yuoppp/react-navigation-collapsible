var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { Animated, Dimensions, } from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import { getSafeBounceHeight, getDefaultHeaderHeight, getNavigationHeight, getScrollIndicatorInsetTop, getStatusBarHeight, } from './utils';
import { CollapsedHeaderBackground as DefaultCollapsedHeaderBackground } from './CollapsedHeaderBackground';
var Stack = createStackNavigator();
var CollapsibleTarget;
(function (CollapsibleTarget) {
    CollapsibleTarget[CollapsibleTarget["Default"] = 0] = "Default";
    CollapsibleTarget[CollapsibleTarget["SubHeader"] = 1] = "SubHeader";
})(CollapsibleTarget || (CollapsibleTarget = {}));
var createCollapsibleStack = function (ScreenElement, config, collapsibleTarget) {
    if (config === void 0) { config = {}; }
    if (collapsibleTarget === void 0) { collapsibleTarget = CollapsibleTarget.Default; }
    var _a = ScreenElement.props || {}, _b = _a.options, options = _b === void 0 ? {} : _b, UserComponent = _a.component;
    var userOptions = options;
    var positionY = React.useRef(new Animated.Value(0)).current;
    var onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: positionY } } }], {
        useNativeDriver: config.useNativeDriver === undefined ? true : config.useNativeDriver,
    });
    var onScrollWithListener = function (listener) {
        return Animated.event([{ nativeEvent: { contentOffset: { y: positionY } } }], {
            useNativeDriver: config.useNativeDriver === undefined ? true : config.useNativeDriver,
            listener: listener,
        });
    };
    var CollapsedHeaderBackground = config.CollapsedHeaderBackground || DefaultCollapsedHeaderBackground;
    return (<Stack.Screen {...ScreenElement.props} key={config.key} options={function (_a) {
        var navigation = _a.navigation, route = _a.route;
        var _b, _c, _d, _e, _f, _g;
        if (typeof userOptions === 'function')
            userOptions = userOptions({ navigation: navigation, route: route });
        var window = Dimensions.get('window');
        var isLandscape = window.height < window.width;
        var headerHeight = 0;
        if (collapsibleTarget === CollapsibleTarget.SubHeader) {
            headerHeight = ((_b = route.params) === null || _b === void 0 ? void 0 : _b.collapsibleSubHeaderHeight) || 0;
        }
        else {
            if (((_c = userOptions.headerStyle) === null || _c === void 0 ? void 0 : _c.height) != null) {
                headerHeight =
                    userOptions.headerStyle.height - getStatusBarHeight(isLandscape);
            }
            else {
                headerHeight = getDefaultHeaderHeight(isLandscape);
            }
        }
        var safeBounceHeight = getSafeBounceHeight();
        var animatedDiffClampY = Animated.diffClamp(positionY, 0, safeBounceHeight + headerHeight);
        var progress = animatedDiffClampY.interpolate({
            inputRange: [safeBounceHeight, safeBounceHeight + headerHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        var translateY = Animated.multiply(progress, -headerHeight);
        var opacity = Animated.subtract(1, progress);
        var containerPaddingTop = collapsibleTarget === CollapsibleTarget.SubHeader
            ? headerHeight
            : getNavigationHeight(isLandscape, headerHeight);
        var scrollIndicatorInsetTop = collapsibleTarget === CollapsibleTarget.SubHeader
            ? headerHeight
            : getScrollIndicatorInsetTop(isLandscape, headerHeight);
        var contentPaddingTopValue;
        var scrollIndicatorInsetTopValue;
        if (config.animatedInsets) {
            contentPaddingTopValue = Animated.multiply(progress, -containerPaddingTop);
            scrollIndicatorInsetTopValue = Animated.multiply(progress, -scrollIndicatorInsetTop);
        }
        else {
            contentPaddingTopValue = containerPaddingTop;
            scrollIndicatorInsetTopValue = scrollIndicatorInsetTop;
        }
        var collapsible = {
            onScroll: onScroll,
            onScrollWithListener: onScrollWithListener,
            containerPaddingTop: contentPaddingTopValue,
            scrollIndicatorInsetTop: scrollIndicatorInsetTopValue,
            translateY: translateY,
            progress: progress,
            opacity: opacity,
            positionY: positionY,
        };
        if (((_d = route.params) === null || _d === void 0 ? void 0 : _d.isCollapsibleDirty) ||
            ((_e = route.params) === null || _e === void 0 ? void 0 : _e.collapsible) == null) {
            navigation.setParams({ collapsible: collapsible, isCollapsibleDirty: false });
        }
        return collapsibleTarget === CollapsibleTarget.SubHeader
            ? userOptions
            : __assign(__assign({}, userOptions), { headerStyle: __assign(__assign({}, userOptions.headerStyle), { transform: [{ translateY: translateY }], opacity: opacity }), headerBackground: CollapsedHeaderBackground({
                    translateY: translateY,
                    opacity: opacity,
                    backgroundColor: (_f = userOptions.headerStyle) === null || _f === void 0 ? void 0 : _f.backgroundColor,
                    collapsedColor: config.collapsedColor || ((_g = userOptions.headerStyle) === null || _g === void 0 ? void 0 : _g.backgroundColor),
                    elevation: config.elevation,
                }), headerTransparent: true });
    }} component={UserComponent}/>);
};
var createCollapsibleStackSub = function (ScreenElement, config) {
    if (config === void 0) { config = {}; }
    return createCollapsibleStack(ScreenElement, config, CollapsibleTarget.SubHeader);
};
export { createCollapsibleStack, createCollapsibleStackSub };
