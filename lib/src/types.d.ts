import { ReactNode } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Params as CollapsedHeaderBackgroundParams } from './CollapsedHeaderBackground';
export declare type Collapsible = {
    onScroll: Function;
    onScrollWithListener: (listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) => Function;
    containerPaddingTop: number;
    scrollIndicatorInsetTop: number;
    translateY: Animated.AnimatedInterpolation;
    progress: Animated.AnimatedInterpolation;
    opacity: Animated.AnimatedInterpolation;
    positionY: Animated.AnimatedValue;
};
export declare type CollapsibleStackConfig = {
    collapsedColor?: string;
    useNativeDriver?: boolean;
    CollapsedHeaderBackground?: (params: CollapsedHeaderBackgroundParams) => ReactNode;
    key?: string;
    elevation?: number;
    animatedInsets?: boolean;
};
