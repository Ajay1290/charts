import React from 'react';
import {View, Text} from 'react-native';
import PieChartAnimated from '.';
import data from './data';

export default function PieChartAnimatedScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <PieChartAnimated data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>PieChart Animated</Text>
    </View>
  );
}
