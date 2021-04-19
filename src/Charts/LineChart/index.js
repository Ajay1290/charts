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
const labelArea = 15;

export default function LineChart({data, style, svgStyle}) {
  const df = new DataFrame({data});

  const xDomain = [df.minXs(), df.maxXs()];
  const yDomain = [df.minYs(), df.maxYs()];

  const xRange = [labelArea, width + labelArea];
  const yRange = [height - labelArea, labelArea];

  const x = d3.scaleLinear().domain(xDomain).range(xRange);

  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const line = d3
    .line()
    .x(d => x(d.x))
    .y(d => y(d.y))(data);

  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

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
        />
        <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={2} />
      </Svg>
    </View>
  );
}
