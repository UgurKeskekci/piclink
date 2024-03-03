// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import EventPage from './EventtPage';
import { AppStateProvider } from './AppStateContext';
const Stack = createStackNavigator();

const App = () => {
  return (
    <AppStateProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="EventPage" component={EventPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </AppStateProvider>
  );
};

export default App;
