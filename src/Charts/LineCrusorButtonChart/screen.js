import React from 'react';
import {View, Text} from 'react-native';
import LineCursorButtonChart from '.';
import data from './data';

export default function LineCursorButtonScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LineCursorButtonChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Line Cursor Button Chart</Text>
    </View>
  );
}
