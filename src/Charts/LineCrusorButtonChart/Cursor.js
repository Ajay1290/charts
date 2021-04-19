import {PanGestureHandler} from 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {getYForX} from 'react-native-redash';

const CURSOR = 50;

export default function Cursor({translation, index, graphs}) {
  const active = useSharedValue(false);
  const x = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      active.value = true;
    },
    onActive: event => {
      x.value = event.x;
      translation.y.value = getYForX(graphs[index.value].path, x.value);
    },
    onEnd: () => {
      active.value = false;
    },
  });

  const moveCursor = useAnimatedStyle(() => {
    const translateX = x.value - CURSOR / 2;
    const translateY = translation.y.value - CURSOR / 2;
    return {
      transform: [{translateX}, {translateY}],
      opacity: withTiming(active.value ? 1 : 0),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.cursor, moveCursor]}>
          <View style={styles.cursorBody} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'black',
  },
});
