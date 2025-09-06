import { useContext, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaContainer from '../components/SafeAreaContainer';
import {
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { SvgIcons } from '../components/SvgIcons';
import { width } from '../utils/Dimensions';
import useThemedStyles from '../hooks/usethemestyle';
import MainStack from './MainStack';
import useTheme from '../hooks/useTheme';
import { AppContext } from '../context/AuthContext';
import PopupModal from '../components/PopupModal/PopupModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../api';
import { showError, showSuccess } from '../utils/ToastMessage';
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const {
    setIsAuthLogin,
    setToken,
    agentData,
    setAgentData,
    setAgentId,
    refreshToken,
  } = useContext(AppContext);
  const { colors } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    try {
      // const res = await ApiRequest.logout(refreshToken);
      // showSuccess(res.message);
      showSuccess('Logout Successfully');
      setToken(null);
      setAgentData();
      setAgentId();
      setIsAuthLogin(false);
      await AsyncStorage.clear();
    } catch (error) {
      showError('Logout Error :' + error.toString());
    }
  };
  const style = useThemedStyles(styles);
  const user = {
    name: agentData?.agentUserName || '',
    id: agentData?.agentNumber || '',
    image: '',
  };

  const renderUserAvatar = () => {
    if (user?.image || false) {
      return <Image source={{ uri: user?.image }} style={style.avatarImage} />;
    } else {
      const initials =
        user?.name || 'X'
          ? user.name
              .split(' ')
              .map(word => word.charAt(0).toUpperCase())
              .join('')
          : '';
      return (
        <View style={style.avatarFallback}>
          <Text style={style.avatarText}>{initials}</Text>
        </View>
      );
    }
  };
  const DrawerContent = ({ navigation }) => {
    return (
      <SafeAreaContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={style.userInfoContainer}>
            <View style={style.avatarContainer}>{renderUserAvatar()}</View>
            <Text style={style.userName}>{user?.name || 'User Name'}</Text>
            <Text style={style.userId}>{user?.id || 'User ID'}</Text>
          </View>
          <PopupModal
            visible={isModalVisible}
            onClose={hideModal}
            onConfirm={handleConfirm}
            message="Are you sure you want to Log Out ?"
          ></PopupModal>
          <View style={[style.separator, { marginVertical: 0 }]} />
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('MainStack', { screen: 'AgentDetails' })
            }
          >
            <View style={style.btncontainer}>
              <Image
                style={style.icon}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
                }}
              />
              <Text
                style={[
                  style.txt,
                  {
                    fontSize: width * 0.035,
                  },
                ]}
              >
                My Account
              </Text>
            </View>
          </TouchableNativeFeedback>
          <View style={[style.separator, { marginVertical: 0 }]} />
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('MainStack', { screen: 'PastCollection' })
            }
          >
            <View style={style.btncontainer}>
              <Image
                style={style.icon}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1019/1019709.png',
                }}
              />
              <Text
                style={[
                  style.txt,
                  {
                    fontSize: width * 0.035,
                  },
                ]}
              >
                Collection
              </Text>
            </View>
          </TouchableNativeFeedback>
          <View style={[style.separator, { marginVertical: 0 }]} />
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('MainStack', { screen: 'CollectionHistory' })
            }
          >
            <View style={style.btncontainer}>
              <Image
                style={style.icon}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3359/3359235.png',
                }}
              />
              <Text
                style={[
                  style.txt,
                  {
                    fontSize: width * 0.035,
                  },
                ]}
              >
                Collection History
              </Text>
            </View>
          </TouchableNativeFeedback>
          <View style={[style.separator, { marginVertical: 0 }]} />
          {/*
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('MainStack', { screen: "PrintScreen"})}
            >
              <View style={style.btncontainer}>
                <Image
                  style={style.icon}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/4469/4469738.png",
                  }}
                />
                <Text
                  style={[
                    style.txt,
                    {
                      fontSize: width * 0.035,
                    },
                  ]}
                >
                  Print Screen
                </Text>
              </View>
            </TouchableNativeFeedback>
            <View style={[style.separator, { marginVertical: 0 }]} />  */}
        </ScrollView>

        <View style={style.separator} />

        <TouchableNativeFeedback
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View style={[style.btncontainer, { marginVertical: 0 }]}>
            <SvgIcons name={'logout'} color={colors.PRIMARYRED} />
            <Text style={style.logout}>Logout</Text>
          </View>
        </TouchableNativeFeedback>

        <Text
          style={[
            style.txt,
            {
              fontFamily: 'Roboto-Regular',
              color: colors.PRIMARYGRAY,
              textAlign: 'center',
              paddingVertical: width * 0.03,
            },
          ]}
        >
          Version 1.0.0
        </Text>
      </SafeAreaContainer>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        swipeEnabled: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const styles = theme =>
  StyleSheet.create({
    maincontainer: {
      flex: 1,
    },
    btncontainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: width * 0.04,
      marginVertical: width * 0.02,
      paddingVertical: width * 0.01,
    },
    separator: {
      borderBottomWidth: width * 0.004,
      borderColor: theme.colors.PRIMARYGRAY,
      marginVertical: width * 0.04,
      opacity: 0.1,
    },
    logout: {
      fontSize: width * 0.04,
      fontFamily: 'Roboto-Medium',
      color: theme.colors.PRIMARYRED,
      marginLeft: width * 0.01,
    },
    txt: {
      fontSize: width * 0.03,
      fontFamily: 'Roboto-Medium',
      color: theme.colors.PRIMARYBG,
      marginLeft: width * 0.01,
    },
    icon: {
      width: width * 0.055,
      height: width * 0.055,
      resizeMode: 'contain',
      tintColor: theme.colors.PRIMARYBG,
      marginRight: width * 0.01,
    },
    userInfoContainer: {
      padding: width * 0.05,
      alignItems: 'center',
    },
    avatarContainer: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: width * 0.02,
      backgroundColor: theme.colors.PRIMARYBG, // or any color for background
    },
    avatarImage: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.1,
    },
    avatarFallback: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.PRIMARYLIGHT, // background color when no image
    },
    avatarText: {
      fontFamily: 'Roboto-Bold',
      fontSize: width * 0.08,
      color: theme.colors.PRIMARYWHITE,
    },
    userName: {
      fontFamily: 'Roboto-Bold',
      fontSize: width * 0.045,
      color: theme.colors.PRIMARYBLACK,
      textAlign: 'center',
    },
    userId: {
      fontFamily: 'Roboto-Regular',
      fontSize: width * 0.035,
      color: theme.colors.PRIMARYGRAY,
      textAlign: 'center',
    },
  });
