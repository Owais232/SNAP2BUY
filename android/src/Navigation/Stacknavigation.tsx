import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/Login";
import SignUpScreen from "../Screens/Signup";
import Home from "../Screens/Home";



const Stack = createStackNavigator();
const Stacknavigation=()=>{
    return(
    
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    
    )
}



export default Stacknavigation;