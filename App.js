import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNav from './navigation/stackNav';
import RootNav from './navigation/rootNav';
import { RecoilRoot } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    <NavigationContainer>
      <RecoilRoot>
          <RootNav />
      </RecoilRoot>
    </NavigationContainer>
  );
}

export default App;