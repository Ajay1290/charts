import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {View} from 'react-native';
import Axis from '../../compoents/Axis';
import * as d3 from 'd3';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;
const paddingArea = 15;

export default function StackedAreaChart(props) {
  const {data, style, width = Width, height = Height} = props;
  const keys = Object.keys(data[0]).slice(1);

  const series = d3.stack().keys(keys)(data);

  const xDomain = d3.extent(data, d => d.date);
  const yDomain = [0, d3.max(series, d => d3.max(d, a => a[1]))];

  const xRange = [paddingArea, width - paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x = d3.scaleUtc().domain(xDomain).range(xRange);
  const y = d3.scaleLinear().domain(yDomain).nice().range(yRange);
  const color = d3.scaleOrdinal().domain(keys).range(d3.schemeCategory10);

  series.forEach((s, i) => s.forEach((l, i) => (l[2] = data[i].date)));

  const area = d3
    .area()
    .curve(d3.curveLinear)
    .x((d, i) => x(d[2]))
    .y0((d, i) => y(d[0]))
    .y1((d, i) => y(d[1]));

  return (
    <View style={style}>
      <Svg {...{width, height}}>
        <Axis.VerticalAxis {...{width, height, data, yAxis: y, paddingArea}} />
        <Axis.HorizontalAxis
          {...{width, height, data, xAxis: x, paddingArea}}
        />
        {series.map((k, i) => (
          <Path key={i} fill={color(keys[i])} d={area(k)} />
        ))}
      </Svg>
    </View>
  );
}
