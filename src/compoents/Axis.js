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
  const {yAxis, data, width, height} = props;
  return (
    <G transform={'translate(0, 0)'}>
      <Line x1={15} y1={0} x2={15} y2={height} {...common} />
      {yAxis.ticks(data.length).map((d, i) => {
        return (
          <Text key={i} fill="#444" textAnchor="start" y={yAxis(d)}>
            {d}
          </Text>
        );
      })}
    </G>
  );
}

export function HorizontalAxis(props) {
  const {xAxis, data, width, height} = props;
  return (
    <G transform={'translate(0, 0)'}>
      <Line x1="0" x2={width} y1={height - 15} y2={height - 15} {...common} />
      {xAxis.ticks(data.length).map((d, i) => (
        <Text key={i} fill="#444" x={xAxis(d)} y={height} textAnchor="start">
          {d}
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
