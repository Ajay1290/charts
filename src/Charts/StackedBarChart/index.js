import React from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Svg, {G, Line, Path, Rect, Text} from 'react-native-svg';
import DataFrame from '../../utils/DataFrame';
import Axis from '../../compoents/Axis';
import * as d3 from 'd3';
import moment from 'moment';

const GRAPH_MARGIN = 10;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;
const paddingArea = 20;

export default function StackedBarChart(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;
  const df = new DataFrame({data});
  const keys = Object.keys(data[0]).slice(1);
  const series = d3.stack().keys(keys)(data);

  series.forEach((s, i) => {
    s.forEach((l, j) => {
      l[2] = data[j].category;
      l[3] = keys[i];
    });
  });

  const xRange = [paddingArea, width - paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x1Domain = data.map(d => d.category);
  const y1Domain = [0, d3.max(series, d => d3.max(d, d => d[1]))];

  const x = d3.scaleBand().domain(x1Domain).range(xRange).padding(0.1);
  const y = d3.scaleLinear().domain(y1Domain).range(yRange);
  const color = d3.scaleOrdinal().domain(keys).range(d3.schemeTableau10);

  const xAxis = df.cols.category;
  const yAxis = y;

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}} viewBox={[0, 0, width, height]}>
        <Axis.VerticalAxis {...{width, height, data, yAxis, paddingArea}} />
        <HorizontalAxis {...{width, height, xAxis, x}} />
        {Array.from(series).map((ser, i) => (
          <>
            {Array.from(ser).map((d, i) => (
              <Rect
                key={i}
                fill={color(d[3])}
                stroke="#444"
                x={x(d[2])}
                y={y(d[1])}
                height={y(d[0]) - y(d[1])}
                width={x.bandwidth()}
              />
            ))}
          </>
        ))}
      </Svg>
    </View>
  );
}

const HorizontalAxis = props => {
  const {xAxis, x, width, height} = props;
  return (
    <G transform={'translate(0, 0)'}>
      <Line
        x1={paddingArea}
        x2={width - paddingArea}
        y1={height - paddingArea}
        y2={height - paddingArea}
        fill="#000"
        stroke="#44444477"
        strokeWidth="2"
      />
      {xAxis.map((d, i) => (
        <Text
          key={i}
          fill="#444"
          fontSize={8}
          x={x(d) + 5}
          y={height - 5}
          textAnchor="start">
          {d}
        </Text>
      ))}
    </G>
  );
};

