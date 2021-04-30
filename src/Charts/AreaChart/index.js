import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as d3 from 'd3';
import {View} from 'react-native';
import Axis from '../../compoents/Axis';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;
const paddingArea = 15;

const makeArea = ({data, width, height}) => {
  const xDomain = d3.extent(data, d => d.x);
  const yDomain = [0, d3.max(data, d => d.y)];

  const xRange = [paddingArea, width + paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x = d3.scaleLinear().domain(xDomain).range(xRange);
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const area = d3
    .area()
    .curve(d3.curveBasis)
    .x(d => x(d.x))
    .y1(d => y(d.y))
    .y0(y(0));

  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

  return {area, yAxis, xAxis, xDomain, yDomain};
};

export default function AreaChart(props) {
  const {data, style, width = Width, height = Height} = props;
  const {area, xAxis, yAxis} = makeArea({data, width, height});

  return (
    <View style={style}>
      <Svg {...{width, height}}>
        <Axis.VerticalAxis {...{yAxis, data, width, height, paddingArea}} />
        <Axis.HorizontalAxis {...{xAxis, data, width, height, paddingArea}} />
        <Path fill="steelblue" d={area(data)} />
      </Svg>
    </View>
  );
}
