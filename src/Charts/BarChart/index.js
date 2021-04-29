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
const paddingArea = 15;

export default function BarChart(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;
  const df = new DataFrame({data});

  const xDomain = d3.range(data.length);
  const yDomain = [0, d3.max(data, d => d.y)];

  const xRange = [paddingArea, width - paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x = d3.scaleBand().domain(xDomain).range(xRange).padding(0.1);
  const y = d3.scaleLinear().domain(yDomain).nice().range(yRange);

  const xAxis = df.Xs;
  const yAxis = y;

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}} viewBox={[0, 0, width, height]}>
        <HorizontalAxis {...{width, height, xAxis, x}} />
        <Axis.VerticalAxis {...{width, height, data, yAxis}} />
        {Array.from(data).map((d, i) => (
          <Rect
            fill="steelblue"
            x={x(i)}
            y={y(d.y)}
            height={y(0) - y(d.y)}
            width={x.bandwidth()}
          />
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
        x1="0"
        x2={width}
        y1={height - 15}
        y2={height - 15}
        fill="#000"
        stroke="#44444477"
        strokeWidth="2"
      />
      {xAxis.map((d, i) => (
        <Text
          key={i}
          fill="#444"
          fontSize={8}
          x={x(i) + 5}
          y={height - 5}
          textAnchor="start">
          {d}
        </Text>
      ))}
    </G>
  );
};
