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

const common = {fill: '#000', stroke: '#44444477', strokeWidth: '2'};

export function VerticalAxis(props) {
  const {yAxis, data, width, height, paddingArea = 15} = props;
  return (
    <G transform={'translate(0, 0)'}>
      <Line
        x1={paddingArea}
        y1={0}
        x2={paddingArea}
        y2={height - paddingArea}
        {...common}
      />
      {yAxis.ticks(data.length).map((d, i) => {
        return (
          <Text
            key={i}
            fontSize={8}
            fill="#444"
            textAnchor="start"
            x={paddingArea == 15 ? 0 : 5}
            y={yAxis(d)}>
            {d}
          </Text>
        );
      })}
    </G>
  );
}

export function HorizontalAxis(props) {
  const {xAxis, data, width, height, paddingArea = 15} = props;
  return (
    <G transform={'translate(0, 0)'}>
      <Line
        x1={paddingArea}
        x2={width - paddingArea}
        y1={height - paddingArea}
        y2={height - paddingArea}
        {...common}
      />
      {xAxis.ticks(data.length).map((d, i) => (
        <Text
          key={i}
          fill="#444"
          fontSize={8}
          x={xAxis(d)}
          y={height}
          textAnchor="middle">
          {d instanceof Date ? moment(d).format('ddd') : d}
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
