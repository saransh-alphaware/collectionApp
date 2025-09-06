import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import SafeAreaContainer from '../../components/SafeAreaContainer';
import useThemedStyles from '../../hooks/usethemestyle';
import useTheme from '../../hooks/useTheme';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { width, height } from '../../utils/Dimensions';
import { showError, showSuccess } from '../../utils/ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../api';
import { AppContext } from '../../context/AuthContext';
import { navigationRef } from '../../navigations/navigationRef';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);
  const { setAgentId, setToken, setIsAuthLogin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // const [agentUserId, setAgentUserId] = useState("23101123");
  // const [agentUserId, setAgentUserId] = useState("1527316");
  // const [agentUserId, setAgentUserId] = useState('2114019');
  // const [agentUserId, setAgentUserId] = useState('2114019');
  // const [agentUserId, setAgentUserId] = useState('232400032');
  const [agentUserId, setAgentUserId] = useState('232400251');
  // const [agentUserId, setAgentUserId] = useState('232400173');

  // const [password, setPassword] = useState("Xlnc@232400102");
  // const [password, setPassword] = useState("Xlnc@23101277");
  // const [password, setPassword] = useState('Xlnc@2089716');
  const [password, setPassword] = useState('Google@123');
  // const [password, setPassword] = useState('Xlnc@232400173');

  const onLogin = async () => {
    if (!agentUserId) {
      showError('Please Enter Agent Id.');
      return;
    }

    if (!password) {
      showError('Please Enter Password.');
      return;
    }
    setLoading(true);
    try {
      let formdata = {
        username: agentUserId,
        password: password,
      };

      const res = await ApiRequest.loginWithPassword(formdata);

      if (res.status === true) {
        showSuccess('Login successfully.');
        await AsyncStorage.setItem('token', res.data.accesstoken);
        await AsyncStorage.setItem('refreshToken', res.data.refreshToken);
        await AsyncStorage.setItem('agentId', res?.data?.agentId);
        setIsAuthLogin(true);
        setToken(res?.data?.token);
        setAgentId(res?.data?.agentId);
        navigationRef.reset({
          index: 0,
          routes: [{ name: 'PastCollection' }],
        });
      } else {
        showError(res?.message);
      }
    } catch (error) {
      console.error(error?.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.curvedContainer}>
          <View style={style.curved} />
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              height: '50%',
              width: '100%',
            }}
          >
            <Text style={style.heading}>Login</Text>
          </View>
        </View>
        <View style={style.maincontainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={[style.img, { marginBottom: 0 }]}
              source={{
                uri: 'https://img.freepik.com/free-vector/completed-steps-concept-illustration_114360-5521.jpg',
              }}
            />
            <Text
              style={[
                style.heading,
                { fontSize: width * 0.06, color: colors.PRIMARYBLACK },
              ]}
            >
              Welcome back
            </Text>
            <Text
              style={[
                style.heading,
                {
                  fontSize: width * 0.035,
                  color: colors.PRIMARYGRAY,
                  marginTop: width * 0.02,
                  marginBottom: width * 0.05,
                },
              ]}
            >
              We are happy to see you again.
            </Text>
          </View>
          <FormInput
            isLeft
            type={'numeric'}
            iconName={'user-outline'}
            value={agentUserId}
            placeholderText={'Enter your Agent Id'}
            stylecontainer={{ width: '82%' }}
            onChangeText={setAgentUserId}
          />
          <FormInput
            isLeft
            type={'password'}
            iconName={'lock'}
            value={password}
            placeholderText={'Enter your password.'}
            stylecontainer={{ width: '82%' }}
            onChangeText={setPassword}
          />
          <Button
            btncontainer={{
              width: width * 0.82,
              marginBottom: width * 0.03,
              marginTop: width * 0.04,
            }}
            loading={loading}
            title={'Login'}
            onPress={onLogin}
          />
        </View>
        <Image
          style={[
            style.img,
            {
              alignSelf: 'center',
              width: '100%',
              height: 0.3 * width,
              marginBottom: 0.03 * width,
            },
          ]}
          source={require('../../assets/images/ttms.png')}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default LoginScreen;

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 0.98,
    },
    heading: {
      fontSize: 0.08 * width,
      fontFamily: 'Roboto-Medium',
      color: theme.colors.PRIMARYWHITE,
      textAlign: 'center',
    },
    maincontainer: {
      backgroundColor: theme.colors.PRIMARYWHITE,
      shadowColor: theme.colors.PRIMARYGRAY,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.6,
      marginHorizontal: 0.04 * width,
      marginVertical: 0.02 * height,
      padding: 0.01 * width,
      borderRadius: 0.04 * width,
      top: -0.1 * height,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 0.02 * height,
      elevation: 4,
    },
    img: {
      width: 0.5 * width,
      height: 0.3 * width,
      resizeMode: 'contain',
    },
    separatorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 0.04 * height,
      alignItems: 'center',
    },
    separateline: {
      borderWidth: 0.44,
      borderColor: theme.colors.PRIMARYGRAY,
      flex: 1,
      opacity: 0.3,
    },
    txt: {
      fontSize: 0.035 * width,
      fontFamily: 'Roboto-Regular',
      color: theme.colors.PRIMARYGRAY,
    },
    curvedContainer: {
      height: height * 0.25,
      justifyContent: 'center',
    },
    curved: {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: theme.colors.PRIMARYBG,
      borderBottomLeftRadius: 1000,
      borderBottomRightRadius: 1000,
      transform: [{ scaleX: 1.7 }],
    },
  });
