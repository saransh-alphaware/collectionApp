import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CollectionHistoryScreen from '../screens/CollectionHistory/CollectionHistoryScreen';
import AgentDetailsScreen from '../screens/AgentDetails/AgentDetailsScreen';
import PastCollectionScreen from '../screens/PastCollections/PastCollectionScreen';
import DateTimePickerScreen from '../screens/DateTimePickerScreen/DateTimePickerScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'PastCollection'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PastCollection" component={PastCollectionScreen} />
      <Stack.Screen
        name="CollectionHistory"
        component={CollectionHistoryScreen}
      />
      <Stack.Screen name="AgentDetails" component={AgentDetailsScreen} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="DateTime" component={DateTimePickerScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
