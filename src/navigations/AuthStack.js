import { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AuthContext";
import DrawerStack from "./DrawerStack";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { isAuthLogin } = useContext(AppContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await AsyncStorage.getItem("alreadyLaunched");
      if (value === null) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthLogin ? "DrawerStack" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      {isAuthLogin ? (
        <Stack.Screen name="DrawerStack" component={DrawerStack} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
