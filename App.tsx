import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './navigation/rootNav';
import { RecoilRoot } from 'recoil';


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