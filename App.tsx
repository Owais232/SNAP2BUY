import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Stacknavigation from './android/src/Navigation/Stacknavigation';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stacknavigation />
  
    </NavigationContainer>
  );
};

export default App;
