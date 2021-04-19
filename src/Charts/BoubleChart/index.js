import React from 'react';
import Svg, {
  Circle,
  ClipPath,
  G,
  Use,
  Text,
  TSpan,
  Defs,
} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as d3 from 'd3';
import {View} from 'react-native';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const height = SVGHeight - 2 * GRAPH_MARGIN;
const width = SVGWidth - 2 * GRAPH_MARGIN;

export default function BoubleChart({data, style, svgStyle}) {
  const color = d3.scaleOrdinal(
    data.map(d => d.group),
    d3.schemeCategory10,
  );

  const pack = data =>
    d3
      .pack()
      .size([width - 2, height - 2])
      .padding(3)(d3.hierarchy({children: data}).sum(d => d.value));

  const root = pack(data);

  return (
    <View style={style}>
      <Svg {...{width, height, ...svgStyle}} style={{borderWidth: 1}}>
        {Array.from(root.leaves()).map((d, i, nodes) => (
          <G key={'d' + i} transform={`translate(${d.x + 1},${d.y + 1})`}>
            <Circle r={d.r} fillOpacity={0.7} fill={color(d.data.group)} />
            <Text fontSize={6} fill="#444" textAnchor="middle">
              <TSpan fill="#444">{d.r <= 8 ? false : d.data.name}</TSpan>
            </Text>
          </G>
        ))}
      </Svg>
    </View>
  );
}
