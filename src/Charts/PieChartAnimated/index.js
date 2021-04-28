import React from 'react';
import {View, Animated} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Svg, {G, Marker, Path, Polyline, Rect, Text, TSpan} from 'react-native-svg';
import {RotationGestureHandler, State} from 'react-native-gesture-handler';
import {pieGenerator} from '../../generators';

const GRAPH_MARGIN = 10;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;

export default function PieChartAnimated(props) {
  const {data, svgStyle, style, height = Height, width = Width} = props;

  const {arc, color, arcLabel, arcs, radius} = pieGenerator({
    data,
    width,
    height,
    radius: Math.min(width, height) / 2.75,
  });

  const rotate = new Animated.Value(0);
  const arcTweenInner = new Animated.Value(0);

  const rotateStr = rotate.interpolate({
    inputRange: [-100, 100],
    outputRange: ['-100rad', '100rad'],
  });

  let pie = [...arcs.map((arc, i) => ({}))];

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

  const pieCorner = (d, rx, ry, h, ir) => {
    //  Calculating  right corner surface key points
    var sxFirst = 0 * rx * Math.cos(d.endAngle);
    var syFirst = 0 * ry * Math.sin(d.endAngle);
    var sxSecond = rx * Math.cos(d.endAngle);
    var sySecond = ry * Math.sin(d.endAngle);
    var sxThird = sxSecond;
    var syThird = sySecond + h;
    var sxFourth = sxFirst;
    var syFourth = syFirst + h;

    // Creating custom path based on calculation
    return `
      M ${sxFirst} ${syFirst}
      L ${sxSecond} ${sySecond}
      L ${sxThird} ${syThird} 
      L ${sxFourth} ${syFourth}
      z
      `;
  };

  const pieCornerSurface = (d, rx, ry, h, ir) => {
    //  Calculating corner left surface key points
    var sxFirst = ir * rx * Math.cos(d.startAngle);
    var syFirst = ir * ry * Math.sin(d.startAngle);
    var sxSecond = rx * Math.cos(d.startAngle);
    var sySecond = ry * Math.sin(d.startAngle);
    var sxThird = sxSecond;
    var syThird = sySecond + h;
    var sxFourth = sxFirst;
    var syFourth = syFirst + h;

    // Creating custom path based on calculation
    return `
      M ${sxFirst} ${syFirst} 
      L ${sxSecond} ${sySecond}
      L ${sxThird} ${syThird} 
      L ${sxFourth} ${syFourth}
      z
    `;
  };

  const pieTop = (d, rx, ry, h) => {
    // If angles are equal, then we got nothing to draw
    if (d.endAngle - d.startAngle == 0) {
      return 'M 0 0';
    }

    // Calculating shape key points
    var sx = rx * Math.cos(d.startAngle),
      sy = ry * Math.sin(d.startAngle),
      ex = rx * Math.cos(d.endAngle),
      ey = ry * Math.sin(d.endAngle);

    // Creating custom path based on calculation
    var ret = [];
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
      h * ex,
      h * ey,
    );
    ret.push(
      'A',
      h * rx,
      h * ry,
      '0',
      d.endAngle - d.startAngle > Math.PI ? 1 : 0,
      '0',
      h * sx,
      h * sy,
      'z',
    );
    return ret.join(' ');
  };

  const sliceOnPress = (d, i) => {
    pie.forEach((s, j) => {
      if (i !== j) {
        Object.keys(s).forEach((p, k) => {
          s[p].setNativeProps({
            opacity: 0.5,
          });
        });
      } else {
        Object.keys(s).forEach((p, k) => {
          s[p].setNativeProps({
            opacity: 1,
          });
        });
      }
    });
  };

  const midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2;

  const points = d => {
    var pos = arcLabel.centroid(d);
    pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
    return [arc.centroid(d), arcLabel.centroid(d), pos].join(',');
  };

  const labelPos = d => {
    var pos = arcLabel.centroid(d);
    pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
    return 'translate(' + pos + ')';
  };

  const Labels = () => {
    return Array.from(arcs).map((d, i) => (
      <Text
        key={'label' + i}
        fontSize={8}
        fill="#444"
        x={0}
        y={0.7}
        textAnchor={midAngle(d) < Math.PI ? 'start' : 'end'}
        transform={labelPos(d)}>
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
    ));
  };

  return (
    <View>
      <RotationGestureHandler
        onGestureEvent={onRotateGestureEvent}
        onHandlerStateChange={onRotateHandlerStateChange}>
        <Animated.View
        // style={{transform: [{perspective: 800}, {rotate: rotateStr}]}}
        >
          <Animated.View
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Svg
              {...{width, height, ...svgStyle}}
              style={{borderWidth: 1}}
              viewBox={[-width / 2, -height / 2, width, height]}>
              <G stroke="#FFF">
                {Array.from(arcs).map((d, i) => (
                  <Animated.View>
                    <Path
                      key={'s' + i}
                      opacity={0.5}
                      ref={ref => (pie[i].surface = ref)}
                      d={pieCornerSurface(d, 100, 100, 20, 0)}
                      fill={color(d.data.label)}
                      onPress={() => sliceOnPress(d, i)}
                    />
                  </Animated.View>
                ))}

                {Array.from(arcs).map((d, i) => (
                  <Animated.View>
                    <Path
                      key={'c' + i}
                      opacity={0.5}
                      ref={ref => (pie[i].corner = ref)}
                      d={pieCorner(d, 100, 100, 20, 0)}
                      fill={color(d.data.label)}
                      onPress={() => sliceOnPress(d, i)}
                    />
                  </Animated.View>
                ))}

                {Array.from(arcs).map((d, i) => (
                  <Animated.View>
                    <Path
                      key={'t' + i}
                      opacity={0.5}
                      ref={ref => (pie[i].top = ref)}
                      d={pieTop(d, 1, 1, 100)}
                      fill={color(d.data.label)}
                      onPress={() => sliceOnPress(d, i)}
                    />
                  </Animated.View>
                ))}

                {Array.from(arcs).map((d, i) => (
                  <Animated.View>
                    <Path
                      key={'o' + i}
                      opacity={0.5}
                      ref={ref => (pie[i].outer = ref)}
                      d={pieOuter(d, 100, 100, 20)}
                      fill={color(d.data.label)}
                      onPress={() => sliceOnPress(d, i)}
                    />
                  </Animated.View>
                ))}
              </G>
              {/* <G>
                {Array.from(arcs).map((d, i) => (
                  <Polyline
                    key={'p' + i}
                    points={points(d)}
                    fill="none"
                    stroke="#444"
                    strokeWidth="1"
                  />
                ))}
                <Labels />
              </G> */}
            </Svg>
          </Animated.View>
        </Animated.View>
      </RotationGestureHandler>
    </View>
  );
}

/*
{/*

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
