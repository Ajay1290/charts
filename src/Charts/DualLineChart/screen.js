import React from 'react';
import {View, Text} from 'react-native';
import DualLineChart from '../DualLineChart';
import data from './data';

export default function DualLineScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <DualLineChart {...{data}} />
      <Text style={{marginTop: 40, fontSize: 24}}>Dual Line Chart</Text>
    </View>
  );
}
