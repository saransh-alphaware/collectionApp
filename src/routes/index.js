import { Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { width } from "../utils/Dimensions";
import AuthStack from "../navigations/AuthStack";
import useTheme from "../hooks/useTheme";
import ActivityLoader from "../components/ActivityLoader";
import { SvgIcons } from "../components/SvgIcons";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../navigations/navigationRef";
import { AppContext } from "../context/AuthContext";
import DrawerStack from "../navigations/DrawerStack";

const Routes = () => {
  const { colors } = useTheme();
  const { token } = useContext(AppContext);

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnectionStatus(netInfoState.isConnected);

      const unsubscribe = NetInfo.addEventListener((state) => {
        setConnectionStatus(state.isConnected);
      });

      return unsubscribe;
    };

    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };

    checkConnection();
    loadData();
  }, []);

  if (loading) {
    return <ActivityLoader />;
  } else if (connectionStatus) {
    return (
      <NavigationContainer ref={navigationRef}>
        {token !== null ? <DrawerStack /> : <AuthStack />}
      </NavigationContainer>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.PRIMARYWHITE,
        }}
      >
        <SvgIcons
          name={"internet"}
          size={width * 0.2}
          color={colors.PRIMARYBG}
        />
        <Text
          style={{
            fontSize: width * 0.06,
            fontFamily: "Roboto-Bold",
            color: colors.PRIMARYBG,
          }}
        >
          No Internet Connection
        </Text>
        <Text
          style={{
            fontSize: width * 0.035,
            fontFamily: "Roboto-Medium",
            color: colors.PRIMARYGRAY,
            width: width - 70,
            textAlign: "center",
            marginTop: width * 0.01,
          }}
        >
          Please check your internet connection or try again later.
        </Text>
      </View>
    );
  }
};

export default Routes;
