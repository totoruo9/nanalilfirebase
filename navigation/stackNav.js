import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Agreement from '../screen/member/Agreement';
import Login from '../screen/member/Login';

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen options={{presentation:'modal'}} name="Login" component={Login} />
      <Stack.Screen options={{presentation:'modal'}} name="Agreement" component={Agreement} />
    </Stack.Navigator>
  );
}