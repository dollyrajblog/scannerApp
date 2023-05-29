import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Next_page from '../screens/Next_page/Next_page';
import Initial from '../screens/Initial/Initial';
import Scan from '../screens/Scan/Scan';
import TextRead from '../screens/TextRead/TextRead';
const Stack = createStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="TextRead" component={TextRead} />
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Next_page" component={Next_page} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
