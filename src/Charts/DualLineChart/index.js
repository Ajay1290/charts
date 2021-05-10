import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as d3 from 'd3';
import Axis from '../../compoents/Axis';
import {View} from 'react-native';
import DataFrame from '../../utils/DataFrame';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const height = SVGHeight - 2 * GRAPH_MARGIN;
const width = SVGWidth - 2 * GRAPH_MARGIN;
const labelArea = 15;

const lineMaker = data => {
  const df = new DataFrame({data});

  const xDomain = [df.minXs(), df.maxXs()];
  const yDomain = [df.minYs(), df.maxYs()];

  const xRange = [labelArea, width + labelArea];
  const yRange = [height - labelArea, labelArea];

  const x = d3.scaleLinear().domain(xDomain).range(xRange);
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const line = d3
    .line()
    .curve(d3.curveBasis)
    .x(d => x(d.x))
    .y(d => y(d.y))(data);

  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);
  return {line, xAxis, yAxis, x, y};
};

export default function DualLineChart({data, style, svgStyle}) {
  const df = new DataFrame({data});
  const keys = df.columns.slice(1);
  const series = [];

  keys.forEach((k, i) => {
    const ser = [];
    data.forEach((s, j) => {
      const d = {
        label: k,
        x: s.date,
        y: s[k],
      };
      ser.push(d);
    });
    series.push(ser);
  });

  const color = d3.scaleOrdinal().domain(keys).range(d3.schemeTableau10);

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}}>
        {series.map((s, i) => (
          <Path
            key={i}
            d={lineMaker(s).line}
            fill="transparent"
            stroke={color(s[i].label)}
            strokeWidth={2}
          />
        ))}
      </Svg>
    </View>
  );
}
