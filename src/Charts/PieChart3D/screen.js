import React from 'react';
import {View, Text} from 'react-native';
import PieChart3D from '.';
import data from './data';

export default function PieChart3DScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <PieChart3D data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>PieChart Animated</Text>
    </View>
  );
}
