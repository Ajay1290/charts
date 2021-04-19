import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as d3 from 'd3';
import Axis from '../../compoents/Axis';
import {View} from 'react-native';
import DataFrame from '../../utils/DataFrame';
import moment from 'moment';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const height = SVGHeight - 2 * GRAPH_MARGIN;
const width = SVGWidth - 2 * GRAPH_MARGIN;

export default function AreaChart({data, style, svgStyle}) {
  const df = new DataFrame({data});
  const x = d3
    .scaleUtc()
    .domain(d3.extent(data, d => d.x))
    .range([15, width - 15]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .nice()
    .range([height - 15, 15]);

  const area = d3
    .area()
    .curve(d3.curveBasis)
    .x(d => x(d.x))
    .y0(y(0))
    .y1(d => y(d.y));

  const yDomain = d3.range(df.maxYs() + 6);
  const yRange = [height - 15, 15];
  const yAxis = d3.scalePoint().domain(yDomain).range(yRange);

  const xDomain = df.Xs.map(d => moment(d).utc().format('MMM'));
  const xRange = [15, width + 15];
  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}}>
        <Axis.VerticalAxis
          y={yAxis}
          data={data}
          width={width}
          height={height}
        />
        <Axis.HorizontalAxis
          x={xAxis}
          data={data}
          width={width}
          height={height}
          xTicks={xDomain}
        />
        <Path d={area(data, width, height)} fill="steelblue" strokeWidth={2} />
      </Svg>
    </View>
  );
}
