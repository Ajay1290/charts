import React from 'react';
import {View, Animated} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Svg, {G, Path, Text, TSpan} from 'react-native-svg';
import {RotationGestureHandler, State} from 'react-native-gesture-handler';
import {pieGenerator} from '../../generators';

const GRAPH_MARGIN = 10;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;

export default function PieChartAnimated(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;

  const {arc, color, arcLabel, arcs} = pieGenerator({data, width, height});

  const rotate = new Animated.Value(0);

  const rotateStr = rotate.interpolate({
    inputRange: [-100, 100],
    outputRange: ['-100rad', '100rad'],
  });

  const onRotateGestureEvent = Animated.event(
    [{nativeEvent: {rotation: rotate}}],
    {useNativeDriver: true},
  );

  let lastRotate = 0;

  const onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastRotate += event.nativeEvent.rotation;
      rotate.setOffset(lastRotate);
      rotate.setValue(0);
    }
  };

  const pieInner = (d, rx, ry, h, ir) => {
    const startAngle = d.startAngle < Math.PI ? Math.PI : d.startAngle;
    const endAngle = d.endAngle < Math.PI ? Math.PI : d.endAngle;

    const sx = ir * rx * Math.cos(startAngle);
    const sy = ir * ry * Math.sin(startAngle);
    const ex = ir * rx * Math.cos(endAngle);
    const ey = ir * ry * Math.sin(endAngle);

    const ret = [];
    ret.push(
      'M',
      sx,
      sy,
      'A',
      ir * rx,
      ir * ry,
      '0 0 1',
      ex,
      ey,
      'L',
      ex,
      h + ey,
      'A',
      ir * rx,
      ir * ry,
      '0 0 0',
      sx,
      h + sy,
      'z',
    );
    return ret.join(' ');
  };

  const pieOuter = (d, rx, ry, h) => {
    const startAngle = d.startAngle > Math.PI ? Math.PI : d.startAngle;
    const endAngle = d.endAngle > Math.PI ? Math.PI : d.endAngle;

    const sx = rx * Math.cos(startAngle),
      sy = ry * Math.sin(startAngle),
      ex = rx * Math.cos(endAngle),
      ey = ry * Math.sin(endAngle);

    const ret = [];
    ret.push(
      'M',
      sx,
      h + sy,
      'A',
      rx,
      ry,
      '0 0 1',
      ex,
      h + ey,
      'L',
      ex,
      ey,
      'A',
      rx,
      ry,
      '0 0 0',
      sx,
      sy,
      'z',
    );
    return ret.join(' ');
  };

  const pieTop = (d, rx, ry, ir) => {
    if (d.endAngle - d.startAngle == 0) {
      return 'M 0 0';
    }
    const sx = rx * Math.cos(d.startAngle),
      sy = ry * Math.sin(d.startAngle),
      ex = rx * Math.cos(d.endAngle),
      ey = ry * Math.sin(d.endAngle);

    const ret = [];
    ret.push(
      'M',
      sx,
      sy,
      'A',
      rx,
      ry,
      '0',
      d.endAngle - d.startAngle > Math.PI ? 1 : 0,
      '1',
      ex,
      ey,
      'L',
      ir * ex,
      ir * ey,
    );
    ret.push(
      'A',
      ir * rx,
      ir * ry,
      '0',
      d.endAngle - d.startAngle > Math.PI ? 1 : 0,
      '0',
      ir * sx,
      ir * sy,
      'z',
    );
    return ret.join(' ');
  };

  return (
    <View>
      <RotationGestureHandler
        onGestureEvent={onRotateGestureEvent}
        onHandlerStateChange={onRotateHandlerStateChange}>
        <Animated.View
          style={{transform: [{perspective: 800}, {rotate: rotateStr}]}}>
          <Animated.View
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Svg
              {...{width, height, ...svgStyle}}
              viewBox={[-width / 2, -height / 2, width, height]}>
              <G stroke="#FFF">
                {Array.from(arcs).map((d, i) => (
                  <>
                    <Path
                      key={`top${i}`}
                      d={pieTop(d, 1, 1, 100, 20)}
                      fill={color(d.data.label)}
                    />
                    <Path
                      key={`outer${i}`}
                      d={pieOuter(d, 100, 100, 20)}
                      fill={color(d.data.label)}
                    />
                  </>
                ))}
              </G>
            </Svg>
          </Animated.View>
        </Animated.View>
      </RotationGestureHandler>
    </View>
  );
}

/*
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
                    {d.endAngle - d.startAngle > 0.25 && (
                      <G key={'Gr' + i}>
                        <TSpan key={'lab' + i} y="-0.4em" fontWeight="bold">
                          {d.data.label}
                        </TSpan>
                        <TSpan key={'value' + i} x="0" y="0.7em">
                          {d.data.value.toLocaleString()}
                        </TSpan>
                      </G>
                    )}
                  </Text>
                ))}
              </G>
*/
