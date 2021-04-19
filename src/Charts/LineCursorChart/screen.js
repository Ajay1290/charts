import React from 'react';
import {View, Text} from 'react-native';
import LineCursorChart from '../LineCursorChart';
import data from './data';

export default function LineCursorScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LineCursorChart data={data} svgStyle={{borderWidth:1}} />
      <Text style={{marginTop: 40, fontSize: 24}}>Line Cursor Chart</Text>
    </View>
  );
}
