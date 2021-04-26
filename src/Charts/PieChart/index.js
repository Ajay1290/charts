import React from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Svg, {G, Path, Text, TSpan} from 'react-native-svg';
import * as d3 from 'd3';
import {pieGenerator} from '../../generators';

const GRAPH_MARGIN = 10;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;

export default function PieChart(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;

  const {arc, arcLabel, arcs, color} = pieGenerator({data, width, height});

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
