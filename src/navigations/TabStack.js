import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import { SvgIcons } from '../components/SvgIcons';
import useTheme from '../hooks/useTheme';
import { width } from '../utils/Dimensions';
import CollectionHistoryScreen from '../screens/CollectionHistory/CollectionHistoryScreen';
import PastCollectionScreen from '../screens/PastCollections/PastCollectionScreen';
import DateTimePickerScreen from '../screens/DateTimePickerScreen/DateTimePickerScreen';
const Tab = createBottomTabNavigator();

const TabStack = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Collection History') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Past Collection') {
            iconName = focused ? 'rupee' : 'rupee-outline';
          }
          return (
            <SvgIcons
              name={iconName}
              size={width * 0.07}
              color={color}
              strokeWidth={1.5}
            />
          );
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: width * 0.034,
          fontFamily: 'Roboto-Medium',
          marginBottom: width * 0.006,
        },
        tabBarActiveTintColor: colors.PRIMARYBG,
        tabBarInactiveTintColor: colors.PRIMARYGRAY,
        tabBarAllowFontScaling: true,
        tabBarStyle: {
          backgroundColor: colors.PRIMARYBGGRAY,
          padding: width * 0.02,
          shadowColor: colors.PRIMARYBG,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.7,
          elevation: 2,
          height: Platform.OS === 'ios' ? width * 0.2 : width * 0.14,
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen
        name="Collection History"
        component={CollectionHistoryScreen}
      />
      <Tab.Screen name="Past Collection" component={PastCollectionScreen} />
      <Tab.Screen name="Date Time" component={DateTimePickerScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
