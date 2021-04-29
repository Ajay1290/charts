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

export default function HorizontalBarChart(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;
  const df = new DataFrame({data});

  const xDomain = [0, d3.max(data, d => d.x)];
  const yDomain = d3.range(data.length);

  const xRange = [paddingArea, width - paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x = d3.scaleLinear().domain(xDomain).range(xRange);
  const y = d3.scaleBand().domain(yDomain).rangeRound(yRange).padding(0.1);

  const xAxis = df.Xs;
  const yAxis = df.Ys;

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}} viewBox={[0, 0, width, height]}>
        <VerticalAxis {...{width, height, y, yAxis}} />
        {Array.from(data).map((d, i) => (
          <>
            <Rect
              fill="steelblue"
              x={x(0)}
              y={y(i)}
              width={x(d.x) - x(0)}
              height={y.bandwidth()}
            />
            <Text
              key={i}
              fontSize={8}
              fill="#444"
              textAnchor="start"
              x={x(d.x) + 5}
              y={y(i) + 15}>
              {d.x}
            </Text>
          </>
        ))}
      </Svg>
    </View>
  );
}

const VerticalAxis = props => {
  const {yAxis, y, height} = props;
  return (
    <G transform={'translate(0, 0)'}>
      <Line
        x1={paddingArea}
        y1={0}
        x2={paddingArea}
        y2={height}
        {...{fill: '#000', stroke: '#44444477', strokeWidth: '2'}}
      />
      {yAxis.map((d, i) => {
        return (
          <Text
            key={i}
            fontSize={8}
            fill="#444"
            textAnchor="start"
            x={0}
            y={y(i) + 15}>
            {d}
          </Text>
        );
      })}
    </G>
  );
};
