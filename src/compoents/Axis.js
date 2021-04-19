import React from 'react';
import {G, Line, Text} from 'react-native-svg';
import * as d3 from 'd3';
import DataFrame from '../utils/DataFrame';
import moment from 'moment';

const tickPoints = (min, max, ticks) => {
  const step = Math.floor(max / ticks);
  const range = d3.range(min, max + step, step);
  return range;
};

export function VerticalAxis(props) {
  const {y = null, data, width, height, yTicks=null} = props;
  const df = new DataFrame({data});
  const yTicksDefault = tickPoints(df.minYs(), df.maxYs(), 5);
  return (
    <G transform={'translate(0, 0)'}>
      <Line
        x1={15}
        y1={0}
        x2={15}
        y2={height}
        fill="#000"
        stroke="#44444477"
        strokeWidth="2"
      />
      {Array.from(yTicks != null ? yTicks : yTicksDefault).map((d, i) => {
        return (
          <Text
            key={i}
            fill="#444"
            fontSize={6}
            textAnchor="start"
            x={0}
            y={y(d)}>
            {i == 0 ? false : d}
          </Text>
        );
      })}
    </G>
  );
}

export function HorizontalAxis(props) {
  const {x = null, data, width, height, xTicks = null} = props;
  const df = new DataFrame({data});
  const xTicksDefault = tickPoints(df.minXs(), df.maxXs(), 5);
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
      {Array.from(xTicks != null ? xTicks : xTicksDefault).map((d, i) => (
        <Text
          x={x(d)}
          y={height - 5}
          key={'tick' + i}
          fontSize={6}
          fill="#444"
          textAnchor="start">
          {i == 0 ? false : d}
        </Text>
      ))}
    </G>
  );
}

const Axis = {
  HorizontalAxis: HorizontalAxis,
  VerticalAxis: VerticalAxis,
};
export default Axis;
