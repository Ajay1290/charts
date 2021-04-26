import React from 'react';
import {
  matrixVecMul4,
  mix,
  processTransform3d,
  useLoop,
  useValues,
} from 'react-native-redash/lib/module/v1';
import Animated, {divide} from 'react-native-reanimated';
import Gesture from './Gesture';
import Face from './Face';
import Svg, {Circle} from 'react-native-svg';
import {Dimensions, StyleSheet} from 'react-native';

const SIZE = 100;
const {width, height} = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const backface = [
  {x: -0.5, y: -0.5, z: -0.5},
  {x: 0.5, y: -0.5, z: -0.5},
  {x: -0.5, y: 0.5, z: -0.5},
  {x: 0.5, y: 0.5, z: -0.5},
];

const frontface = [
  {x: -0.5, y: -0.5, z: 0.5},
  {x: 0.5, y: -0.5, z: 0.5},
  {x: -0.5, y: 0.5, z: 0.5},
  {x: 0.5, y: 0.5, z: 0.5},
];

const points3D = [...frontface, ...backface];

export default function Object3D() {
  const progress = useLoop(4000, false);
  const theta = mix(progress, 0, Math.PI * 2);
  const transform = processTransform3d([
    {perspective: 600},
    {translateX: width / 2},
    {translateY: height / 2},
    {rotateY: theta},
    {rotateX: theta},
  ]);

  const points = points3D.map(({x, y, z}) =>
    matrixVecMul4(transform, [x * SIZE, y * SIZE, z * SIZE, 1]),
  );

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        {points.map(([cx, cy], i) => (
          <AnimatedCircle key={i} fill="blue" r={10} {...{cx, cy}} />
        ))}
      </Svg>
    </>
  );
}
