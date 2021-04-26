import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as d3 from 'd3';
import Axis from '../../compoents/Axis';
import {View} from 'react-native';
import DataFrame from '../../utils/DataFrame';
import moment from 'moment';
import WebView from 'react-native-webview';
import Area_Chart from './area-chart.html';

const GRAPH_MARGIN = 20;
const SVGHeight = 300;
const SVGWidth = wp('90%');
const Height = SVGHeight - 2 * GRAPH_MARGIN;
const Width = SVGWidth - 2 * GRAPH_MARGIN;

const makeArea = ({data, width, height}) => {
  const df = new DataFrame({data});

  const xDomain = [df.minXs(), df.maxXs()];
  const yDomain = [df.minYs(), df.maxYs()];

  const xRange = [15, width + 15];
  const yRange = [height - 15, 15];

  const x = d3.scaleLinear().domain(d3.range(xDomain[1])).range(xRange);
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const area = d3
    .area()
    .curve(d3.curveLinear)
    .x(d => x(d.x))
    .y1(d => y(d.y))
    .y0(y(0));

  const xAxis = d3.scalePoint().domain(xDomain).range(xRange);
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

  return {area, yAxis, xAxis, xDomain, yDomain};
};

export default function AreaChart(props) {
  const {data, style, width = Width, height = Height} = props;
  // const {area, xAxis, yAxis} = makeArea({data, width, height});
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    console.log(Area_Chart)
    setHtml('file');
  }, []);

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        style={{flex: 1, width: 300}}
        allowFileAccess={true}
        source={{uri:'file:///android_asset/area-chart.html'}}

      />
    </View>
  );
}
