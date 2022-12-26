import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './bottomNav';
import StackNav from './stackNav';

const Stack = createNativeStackNavigator();

export default function RootNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="BottomNav" component={BottomNav} />
      <Stack.Screen options={{presentation:'modal'}} name="StackNav" component={StackNav} />
    </Stack.Navigator>
  );
}