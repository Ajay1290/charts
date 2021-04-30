import React from 'react';
import {StyleSheet, View, Animated, TextInput} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import * as path from 'svg-path-properties';
import * as d3 from 'd3';

import DataFrame from '../../utils/DataFrame';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Axis from '../../compoents/Axis';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const height = SVGHeight - 2 * GRAPH_MARGIN;
const width = SVGWidth - 2 * GRAPH_MARGIN;
const labelArea = 15;
const radius = 10;

export default class LineCursorChart extends React.Component {
  constructor(props) {
    super(props), (this.props = props);
  }

  state = {
    x: new Animated.Value(0),
    data: this.props.data,
  };

  df = new DataFrame({data: this.state.data});

  xDomain = [this.df.minXs(), this.df.maxXs()];
  yDomain = [this.df.minYs(), this.df.maxYs()];

  xRange = [labelArea, width - labelArea];
  yRange = [height - labelArea, labelArea];

  scaleX = d3.scaleTime().domain(this.xDomain).range(this.xRange);
  scaleY = d3.scaleLinear().domain(this.yDomain).range(this.yRange);

  scaleLabel = d3
    .scaleQuantize()
    .domain(this.yDomain)
    .range(d3.range(this.df.maxYs()));

  line = d3
    .line()
    .x(p => this.scaleX(p.x))
    .y(p => this.scaleY(p.y))
    .curve(d3.curveBasis)(this.state.data);

  properties = path.svgPathProperties(this.line);
  lineLength = this.properties.getTotalLength();

  cursor = React.createRef();

  label = React.createRef();

  moveCursor(value) {
    const {x, y} = this.properties.getPointAtLength(this.lineLength - value);
    this.cursor.current.setNativeProps({
      top: y - radius,
      left: x - radius,
    });
    const label = this.scaleLabel(this.scaleY.invert(y));
    this.label.current.setNativeProps({text: `${label} Y Axis`});
  }

  componentDidMount() {
    this.state.x.addListener(({value}) => this.moveCursor(value));
    this.moveCursor(0);
  }
  render() {
    const {x} = this.state;
    const translateX = x.interpolate({
      inputRange: [0, this.lineLength],
      outputRange: [width - labelArea, 15],
      extrapolate: 'clamp',
    });
    return (
      <View>
        <Svg {...{width, height}}>
          <Axis.VerticalAxis data={this.state.data} width={width} height={height} yAxis={this.scaleY} />
          <Axis.HorizontalAxis data={this.state.data} width={width} height={height} xAxis={this.scaleX} />
          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop stopColor="#CDE3F8" offset="0%" />
              <Stop stopColor="#eef6fd" offset="80%" />
              <Stop stopColor="#FEFFFF" offset="100%" />
            </LinearGradient>
          </Defs>
          <Path d={this.line} fill="transparent" stroke="#367be2" strokeWidth={5} />
          <Path d={`${this.line} L ${width - 15} ${height - 16} L 16 ${height - 16}`} fill="url(#gradient)" />
          <View ref={this.cursor} style={styles.cursor} />
        </Svg>
        <Animated.View style={[styles.label, {transform: [{translateX}]}]}>
          <TextInput ref={this.label} />
        </Animated.View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{width: this.lineLength * 2}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cursor: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
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
