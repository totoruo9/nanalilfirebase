import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/HomeScreen';
import Login from '../screen/member/Login';
import Settings from '../screen/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="login" component={Login} />
      <Tab.Screen name="setting" component={Settings} />
    </Tab.Navigator>
  );
}