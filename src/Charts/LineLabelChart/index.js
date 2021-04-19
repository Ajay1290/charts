import React from 'react';
import Svg, {Circle, G, Text, Path, Rect, TSpan} from 'react-native-svg';
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

export default function LineLabelChart({data, style, svgStyle}) {
  const df = new DataFrame({data});

  const xDomain = [df.minXs(), df.maxXs()];
  const yDomain = [df.minYs(), df.maxYs()];

  const xRange = [labelArea, width + labelArea];
  const yRange = [height - labelArea, labelArea];

  const series = [];
  df.columns.slice(1).forEach(c => {
    let ser = [];
    df.cols[c].forEach((v, i) => {
      let d = {key: c, date: df.cols.date[i], value: v};
      ser.push(d);
    });
    series.push(ser);
  });

  const x = d3
    .scaleTime()
    .domain([d3.min(df.cols.date), d3.max(df.cols.date)])
    .range(xRange);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(series, s => d3.max(s, d => d.value))])
    .range(yRange);

  const line = lineData =>
    d3
      .line()
      .x(c => x(c.date))
      .y(c => y(c.value))(lineData);

  const z = d3.scaleOrdinal(df.columns, d3.schemeCategory10);

  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}} viewBox={[0, 0, width, height]}>
        <Axis.HorizontalAxis
          x={xAxis}
          data={data}
          width={width}
          height={height}
        />
        {series.map((d, i) => (
          <G key={'g' + i}>
            <Path key={i} d={line(d)} stroke={z(d[0].key)} strokeWidth={1.5} />
            <G key={'s' + i}>
              {Array.from(d).map((s, i) => (
                <G key={'a' + i}>
                  <Text fill="none" stroke="#FFF" strokeWidth={labelArea} />
                  <Text
                    fontSize={6}
                    fill="#444"
                    dy={'0.35em'}
                    x={x(s.date)}
                    y={y(s.value)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    textAnchor="middle">
                    {s.value}
                    {i === data.length - 1 && (
                      <TSpan fontWeight="bold">{s.key}</TSpan>
                    )}
                  </Text>
                </G>
              ))}
            </G>
          </G>
        ))}
      </Svg>
    </View>
  );
}
