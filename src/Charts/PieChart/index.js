import React from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Svg, {
  Circle,
  G,
  Path,
  Polygon,
  Polyline,
  Text,
  TSpan,
} from 'react-native-svg';
import * as d3 from 'd3';
import {pieGenerator} from '../../generators';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const GRAPH_MARGIN = 10;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;

export default function PieChart(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;

  const {arc, arcLabel, arcs, color, radius} = pieGenerator({
    data,
    width,
    height,
    radius: Math.min(width, height) / 2.75,
  });

  let slices = [];
  let labelValues = [];

  const arcOver = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius + 15);

  const sliceOnPress = (d, i) => {
    slices.forEach((s, j) => {
      labelValues[j].setNativeProps({
        opacity: 0,
        x: arcLabel.centroid(d)[0],
        y: arcLabel.centroid(d)[1],
      });
      s.setNativeProps({
        d: arc(arcs[j]),
        fillOpacity: 1,
      });
      if (i !== j) {
        s.setNativeProps({
          fillOpacity: 0.3,
        });
        labelValues[j].setNativeProps({
          opacity: 0,
        });
      } else {
        s.setNativeProps({
          d: arcOver(d),
        });
        labelValues[j].setNativeProps({
          opacity: 1,
        });
      }
    });
  };

  const onBgPress = () => {
    slices.forEach((s, j) => {
      s.setNativeProps({
        fillOpacity: 1,
        d: arc(arcs[j]),
      });
    });
    labelValues.forEach((s, j) => {
      s.setNativeProps({
        opacity: 0,
      });
    });
  };

  const midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2;

  // const points = d => {
  //   var pos = arcLabel.centroid(d);
  //   pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
  //   return [arc.centroid(d), arcLabel.centroid(d), pos].join(',');
  // };

  // const labelPos = d => {
  //   var pos = arc.centroid(d);
  //   pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
  //   console.log(pos);
  //   return pos;
  // };

  // const Labels = () => {
  //   return Array.from(arcs).map((d, i) => (
  //     <Text
  //       key={'label' + i}
  //       fontSize={8}
  //       fill="#444"
  //       x={0}
  //       y={0.7}
  //       textAnchor={midAngle(d) < Math.PI ? 'start' : 'end'}
  //       transform={labelPos(d)}>
  //       {d.endAngle - d.startAngle > 0.25 ? (
  //         <G key={'Gr' + i}>
  //           <TSpan
  //             key={'lab' + i}
  //             y="0.4em"
  //             x={midAngle(d) < Math.PI ? '0.4em' : '-3em'}
  //             fontWeight="bold">
  //             {d.data.label}, {d.data.value.toLocaleString()}
  //           </TSpan>
  //         </G>
  //       ) : (
  //         false
  //       )}
  //     </Text>
  //   ));
  // };

  return (
    <View style={style}>
      <Svg
        {...{width, height, ...svgStyle}}
        viewBox={[-width / 2.5, -height / 2, width, height]}
        onPress={onBgPress}>
        <G>
          {Array.from(arcs).map((d, i) => (
            <Path
              key={i}
              d={arc(d)}
              stroke="#FFF"
              ref={ref => (slices[i] = ref)}
              fill={color(d.data.label)}
              onPress={() => sliceOnPress(d, i)}
            />
          ))}
        </G>
        <G>
          {Array.from(arcs).map((d, i) => (
            <Text
              key={'label' + i}
              fontSize={8}
              ref={ref => (labelValues[i] = ref)}
              fill="#333"
              opacity={0}
              x={arcLabel.centroid(d)[0]}
              y={arcLabel.centroid(d)[1]}>
              {d.endAngle - d.startAngle > 0.25
                ? (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(
                    2,
                  ) + '%'
                : ''}
            </Text>
          ))}
        </G>
        <G>
          {Array.from(arcs).map((d, i) => (
            <G translateX={radius + 25} translateY={-radius / 2}>
              <Circle
                key={'x' + i}
                cx={0}
                stroke="#44444488"
                cy={10 * i * 2}
                fill={color(d.data.label)}
                r={5}
              />
              <Text
                key={'label' + i}
                fontSize={8}
                fill="#444"
                x={10}
                dx={'0em'}
                dy={'0.25em'}
                y={10 * i * 2}>
                {d.data.label}
              </Text>
            </G>
          ))}
        </G>
      </Svg>
    </View>
  );
}

{
  /* <Polyline
              key={'s' + i}
              points={points(d)}
              fill="none"
              stroke="#44444499"
              strokeWidth="1"
            /> */
}
