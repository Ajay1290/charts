import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Axis from '../../compoents/Axis';
import {StyleSheet, TextInput, View, Animated} from 'react-native';

import DataFrame from '../../utils/DataFrame';

import * as d3 from 'd3';
import * as path from 'svg-path-properties';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const height = SVGHeight - 2 * GRAPH_MARGIN;
const width = SVGWidth - 2 * GRAPH_MARGIN;
const labelArea = 15;
const cursorRadius = 10;

export default function LineToolTipChart({data, style, svgStyle}) {
  const df = new DataFrame({data});

  const cursor = React.createRef();
  const label = React.createRef();

  const [xCursor, setXCursor] = React.useState(new Animated.Value(0));

  const properties = new path.svgPathProperties(line);
  const lineLength = properties.getTotalLength();

  const xDomain = [df.minXs(), df.maxXs()];
  const yDomain = [df.minYs(), df.maxYs()];

  const xRange = [labelArea, width + labelArea];
  const yRange = [height - labelArea, labelArea];

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range(xRange);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range(yRange);

  const line = d3
    .line()
    .curve(d3.curveStep)
    .x(d => x(d.date))
    .y(d => y(d.value))(data);

  const scaleLabel = d3.scaleQuantile().domain([0, 300]).range([0, 200, 300]);

  const moveCursor = value => {
    const point = properties.getPointAtLength(lineLength - value);
    cursor.current.setNativeProps({
      top: point.y - cursorRadius,
      left: point.x - cursorRadius,
    });
    const Label = scaleLabel(y.invert(y));
    label.current.setNativeProps({text: `${Label} CHF`});
  };

  React.useEffect(() => {
    xCursor.addListener(({v}) => moveCursor(v));
    moveCursor(0);
  }, []);

  const translateX = React.useRef(
    xCursor.interpolate({
      inputRange: [0, lineLength],
      outputRange: [width - labelArea, 0],
      extrapolate: 'clamp',
    }),
  );

  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}} style={{overflow: 'visible'}}>
        <Axis.VerticalAxis data={data} width={width} height={height} />
        <Axis.HorizontalAxis data={data} width={width} height={height} />
        <Path
          d={line}
          fill="none"
          stroke="steelblue"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <View ref={cursor} style={styles.cursor} />
      </Svg>
      <Animated.View
        style={[styles.label, {transform: [{translateX: translateX.current}]}]}>
        <TextInput ref={label} />
      </Animated.View>
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{width: lineLength * 2}}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {xCursor}}}], {
          useNativeDriver: true,
        })}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    marginTop: 60,
    height,
    width,
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -45,
    left: 0,
    backgroundColor: 'lightgray',
    width: 100,
  },
});
