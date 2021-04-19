import React from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Svg, {G, Path, Rect, Text} from 'react-native-svg';
import DataFrame from '../../utils/DataFrame';
import {scaleTime, scaleLinear} from 'd3-scale';
import Axis from '../../compoents/Axis';
import * as d3 from 'd3';
import moment from 'moment';

const GRAPH_MARGIN = 10;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;

export default function BarChart(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;
  const df = new DataFrame({data});
  const labelArea = 15;

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([labelArea, width - labelArea])
    .padding(height / width / 10);

  const y = scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([height - labelArea, labelArea]);

  const yDomain = df.Xs;
  const yRange = [height - 15, 15];
  const yAxis = d3.scalePoint().domain(yDomain).range(yRange);

  const xDomain = df.Ys;
  const xRange = [15, width + 15];
  const xAxis = d3.scaleBand().domain(xDomain).range(xRange);

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}} viewBox={[0, 0, width, height]}>
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
        {Array.from(data).map((d, i) => (
          <G key={'gro' + i}>
            <Text key={i + 'S'} fill="#F0F" fontSize={12} x={x(i)} y={y(d.y)}>
              {d.label}
            </Text>
            <Rect
              key={i}
              fill="#444"
              x={x(i)}
              y={y(d.y)}
              height={y(0) - y(d.y)}
              width={x.bandwidth()}
              stroke="#444"
            />
          </G>
        ))}
      </Svg>
    </View>
  );
}
