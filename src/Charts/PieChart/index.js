import React from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Svg, {G, Path, Text, TSpan} from 'react-native-svg';
import * as d3 from 'd3';

const GRAPH_MARGIN = 10;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;

export default function PieChart(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;

  const pie = d3
    .pie()
    .sort(null)
    .value(d => d.value);

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  const color = d3
    .scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(
      d3
        .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
        .reverse(),
    );

  const arcLabel = d3
    .arc()
    .innerRadius((Math.min(width, height) / 2) * 0.8)
    .outerRadius((Math.min(width, height) / 2) * 0.8);

  const arcs = pie(data);

  return (
    <View style={style}>
      <Svg
        {...{width, height, ...svgStyle}}
        viewBox={[-width / 2, -height / 2, width, height]}>
        <G stroke="#FFF">
          {Array.from(arcs).map((d, i) => (
            <Path key={i} d={arc(d)} fill={color(d.data.label)} />
          ))}
        </G>
        <G>
          {Array.from(arcs).map((d, i) => (
            <Text
              key={'label' + i}
              fontSize={12}
              fill="#444"
              x={0}
              y={0.7}
              textAnchor="middle"
              transform={`translate(${arcLabel.centroid(d)})`}>
              {d.endAngle - d.startAngle > 0.25 ? (
                <G key={'Gr' + i}>
                  <TSpan key={'lab' + i} y="-0.4em" fontWeight="bold">
                    {d.data.label}
                  </TSpan>
                  <TSpan key={'value' + i} x="0" y="0.7em">
                    {d.data.value.toLocaleString()}
                  </TSpan>
                </G>
              ) : (
                false
              )}
            </Text>
          ))}
        </G>
      </Svg>
    </View>
  );
}
