import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import PieScreen from './Charts/PieChart/screen';
import LineScreen from './Charts/LineChart/screen';
import BarScreen from './Charts/BarChart/screen';
import AreaScreen from './Charts/AreaChart/screen';
import BoubleScreen from './Charts/BoubleChart/screen';
import LineToolTipScreen from './Charts/LineToolTipChart/screen';
import LineLabelScreen from './Charts/LineLabelChart/screen';
import LineCursorScreen from './Charts/LineCursorChart/screen';
import PieChartAnimatedScreen from './Charts/PieChartAnimated/screen';
import LineCursorButtonScreen from './Charts/LineCrusorButtonChart/screen';

const Drawer = createDrawerNavigator();

const HomeScreen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Open Drawer to Explore D3 Charts</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="PieScreen" component={PieScreen} />
        <Drawer.Screen name="LineScreen" component={LineScreen} />
        <Drawer.Screen name="BarScreen" component={BarScreen} />
        <Drawer.Screen name="Area Chart" component={AreaScreen} />
        <Drawer.Screen name="Bouble Chart" component={BoubleScreen} />
        <Drawer.Screen name="Line-Label Chart" component={LineLabelScreen} />
        <Drawer.Screen name="Line-Cursor Chart" component={LineCursorScreen} />
        <Drawer.Screen
          name="PieChart Animated"
          component={PieChartAnimatedScreen}
        />
        <Drawer.Screen
          name="LineCursorButtonScreen Animated"
          component={LineCursorButtonScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
