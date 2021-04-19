import React from 'react';
import {View, Text} from 'react-native';
import AreaChart from '../AreaChart';
import data from '../AreaChart/data';

export default function BarScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <AreaChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Area Chart</Text>
    </View>
  );
}
