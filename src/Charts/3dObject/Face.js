import React from 'react';
import {StyleSheet} from 'react-native';
import {avg, decompose2d, transform2d} from 'react-native-redash/lib/module/v1';
import Animated from 'react-native-reanimated';

const SIZE = 100;
const canvas = {
  p1: {
    x: -SIZE / 2,
    y: -SIZE / 2,
  },
  p2: {
    x: SIZE / 2,
    y: -SIZE / 2,
  },
  p3: {
    x: -SIZE / 2,
    y: SIZE / 2,
  },
  p4: {
    x: SIZE / 2,
    y: SIZE / 2,
  },
};

export default function Face({backgroundColor, p1, p2, p3, p4}) {
  const transform = decompose2d(
    transform2d({
      canvas,
      projected: {p1, p2, p3, p4},
    }),
  );
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        zIndex: avg(p1.z, p2.z, p3.z, p4.z),
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          height: SIZE,
          width: SIZE,
          backgroundColor,
          transform,
        }}
      />
    </Animated.View>
  );
}
