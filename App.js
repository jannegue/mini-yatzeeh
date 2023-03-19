import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import style from './Styles/style';
import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import Footer from './components/Footer';
import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';



const Tab = createBottomTabNavigator();






export default function App() {

  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf")});
    if (!fontsLoaded) {
    return null;
  }

  return (


    <NavigationContainer>
      {/* <Header /> */}
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: 'none'} ,tabBarIcon: () => <Octicons name="home" size={24} color="black" /> }}/>
        <Tab.Screen name="Gameboard" component={Gameboard} options={{tabBarIcon: () => <FontAwesome5 name="dice" size={24} color="black" />}} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} options={{tabBarIcon: () => <FontAwesome5 name="trophy" size={24} color="black" />}}/>

      </Tab.Navigator>
      {/* <Footer /> */}
    </NavigationContainer>
  );
}
