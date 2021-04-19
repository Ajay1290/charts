import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as d3 from 'd3';
import Axis from '../../compoents/Axis';
import {StyleSheet, Text, View} from 'react-native';
import DataFrame from '../../utils/DataFrame';
import moment from 'moment';
import Cursor from './Cursor';
import {
  mixPath,
  parse,
  ReText,
  serialize,
  useVector,
} from 'react-native-redash';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('95%');
const height = SVGHeight - 2 * GRAPH_MARGIN;
const width = SVGWidth - 2 * GRAPH_MARGIN;
const labelArea = 15;

const lineGenerator = (data, width, height) => {
  const df = new DataFrame({data});

  const xDomain = [df.minXs(), df.maxXs()];
  const yDomain = [df.minYs(), df.maxYs()];

  const xRange = [labelArea, width + labelArea];
  const yRange = [height - labelArea, labelArea];

  let x = d3.scaleLinear().domain(xDomain).range(xRange);
  if (xDomain[0] instanceof Date) {
    x = d3.scaleTime().domain(xDomain).range(xRange);
  }

  let y = d3.scaleLinear().domain(yDomain).range(yRange);
  if (yDomain[0] instanceof Date) {
    y = d3.scaleTime().domain(xDomain).range(xRange);
  }

  const line = d3
    .line()
    .x(d => x(d.x))
    .y(d => y(d.y))
    .curve(d3.curveBasis)(data);

  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

  return {line, xAxis, yAxis, y};
};

export default function LineCursorButtonChart({data, style, svgStyle}) {
  let graphs = [];

  for (const [label, d] of Object.entries(data)) {
    const l = lineGenerator(d, width, height);
    graphs.push({
      label: label,
      data: d,
      yScale: l.y,
      path: parse(l.line),
    });
  }

  const translation = useVector();
  const transition = useSharedValue(0);
  const previous = useSharedValue(0);
  const current = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const previousPath = graphs[previous.value].path;
    const currentPath = graphs[current.value].path;
    return {
      d: mixPath(transition.value, previousPath, currentPath),
    };
  });

  const SELECTION_WIDTH = width - 32;
  const BUTTON_WIDTH = (width - 32) / graphs.length;

  const hoverBtn = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(BUTTON_WIDTH * current.value)}],
  }));

  const yLabel = useDerivedValue(() => {
    const currentGraph = graphs[current.value];
    const Ys = Array.from(currentGraph.data).map((d, i) => d.y);
    const p = interpolate(
      translation.y.value,
      [width, 0],
      [Math.min(...Ys), Math.max(...Ys)],
    );
    return `Y Axis: ${Math.round(p, 2).toLocaleString('en-US', {currency: 'USD'})}`;
  });
  const label = useDerivedValue(() => graphs[current.value].label);

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ReText text={yLabel} style={styles.value} />
        <ReText style={styles.label} text={label} />
      </View>
      <View>
        <Svg {...{width, height, ...svgStyle}}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="black"
            strokeWidth={3}
          />
        </Svg>
        <Cursor translation={translation} graphs={graphs} index={current} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: SELECTION_WIDTH,
          alignSelf: 'center',
        }}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              {
                backgroundColor: '#d3d3d3',
                ...StyleSheet.absoluteFillObject,
                width: BUTTON_WIDTH,
                borderRadius: 8,
              },
              hoverBtn,
            ]}
          />
        </View>
        {graphs.map((graph, index) => (
          <TouchableWithoutFeedback
            key={graph.label}
            onPress={() => {
              previous.value = current.value;
              transition.value = 0;
              current.value = index;
              transition.value = withTiming(1);
            }}>
            <Animated.View style={[{padding: 16, width: BUTTON_WIDTH}]}>
              <Text style={styles.label}>{graph.label}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  values: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    fontWeight: '500',
    fontSize: 24,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
