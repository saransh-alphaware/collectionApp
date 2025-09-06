import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import AppHeader from "../../components/AppHeader";
import useTheme from "../../hooks/useTheme";
import useThemedStyles from "../../hooks/usethemestyle";
import { width } from "../../utils/Dimensions";
import { AppContext } from "../../context/AuthContext";
import ApiRequest from "../../api";
import ActivityLoader from "../../components/ActivityLoader";
import { convertDate } from "../../utils/ConvertDate";
import ChangePassword from "../../components/ChangePassword";

const screens = ["Personal Details", "Agent Account"];

const AgentDetailsScreen = ({ navigation }) => {
  const { agentData, agentId } = useContext(AppContext);
  const { colors } = useTheme();
  const style = useThemedStyles(styles);
  const [isSelected, setIsSelected] = useState(screens[0]);
  const [loading, setLoading] = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAgentAccountsDetils(agentId);
    setRefreshing(false);
  }, []);

  const getAgentAccountsDetils = async (agentId) => {
    setLoading(true);
    try {
      const response = await ApiRequest.getAgentAccountsList(agentId);
      const AgentAccountsList = response?.data;
      setAgentList(AgentAccountsList);
    } catch (error) {
      console.error(error?.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentId) {
      getAgentAccountsDetils(agentId);
    }
  }, [agentId]);

  return (
    <SafeAreaContainer>
      <AppHeader
        isLeft
        title={"Agent Details"}
        onPress={() => navigation.openDrawer()}
        isLeftIcons={true}
        leftIconName={"menu"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ChangePassword
          passwordModalVisible={passwordModalVisible}
          setPasswordModalVisible={setPasswordModalVisible}
        />
        <View style={style.container}>
          <View style={[style.miniCard, { alignItems: "center" }]}>
            <Image
              style={style.img}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
            />
            <View
              style={[style.directionContainer, { marginTop: width * 0.01 }]}
            >
              <Text style={[style.heading, { fontSize: width * 0.04 }]}>
                {agentData?.agentUserName}
              </Text>
            </View>
          </View>

          <View style={style.headerContainer}>
            {screens.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setIsSelected(item);
                }}
                style={[
                  style.headerCard,
                  {
                    backgroundColor:
                      isSelected === item
                        ? colors.PRIMARYBG
                        : colors.TRANSPARENT,
                  },
                ]}
              >
                <Text
                  style={[
                    isSelected === item ? style.heading : style.heading,
                    {
                      color:
                        isSelected === item
                          ? colors.PRIMARYWHITE
                          : colors.PRIMARYGRAY,
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
          {isSelected === "Personal Details" && (
            <View style={style.miniCard}>
              {/* Pan */}
              <View style={style.directionContainer}>
                <Text style={style.txt}>Agent Number</Text>
                <Text style={style.heading}>
                  {agentData?.agentNumber || "-"}
                </Text>
              </View>
              <View style={style.saparateContainer} />

              {/* Gender */}
              <View style={style.directionContainer}>
                <Text style={style.txt}>Gender</Text>
                <Text style={style.heading}>
                  {agentData?.customer?.gender || "-"}
                </Text>
              </View>
              <View style={style.saparateContainer} />

              {/* Date of Birth */}
              <View style={style.directionContainer}>
                <Text style={style.txt}>Date of Birth</Text>
                <Text style={style.heading}>
                  {convertDate(agentData?.customer?.birthDate) || "-"}
                </Text>
              </View>
              <View style={style.saparateContainer} />

              {/* Mobile Number */}
              <View style={style.directionContainer}>
                <Text style={style.txt}>Mobile No.</Text>
                <Text style={style.heading}>
                  {agentData?.customer?.mobileNumber || "-"}
                </Text>
              </View>
              <View style={style.saparateContainer} />

              {/* Email */}
              <View style={style.directionContainer}>
                <Text style={style.txt}>Email</Text>
                <Text style={style.heading}>
                  {agentData?.customer?.email || "-"}
                </Text>
              </View>
              <View style={style.saparateContainer} />

              {/* Date of Joining */}
              <View style={style.directionContainer}>
                <Text style={style.txt}>Date of Joining</Text>
                <Text style={style.heading}>
                  {convertDate(agentData?.joiningDate) || "-"}
                </Text>
              </View>
              <View style={style.saparateContainer} />
            </View>
          )}
          {isSelected === "Agent Account" && (
            <View style={style.miniCard}>
              {loading ? (
                <ActivityLoader />
              ) : (
                <>
                  {agentList &&
                    agentList?.map((data) => (
                      <View key={data?.id}>
                        <View style={style.directionContainer}>
                          <Text style={style.txt}>Agent Number</Text>
                          <Text style={style.heading}>
                            {data?.agentNumber || "-"}
                          </Text>
                        </View>
                        <View style={style.saparateContainer} />
                      </View>
                    ))}
                </>
              )}
            </View>
          )}
          <Pressable
            onPress={() => {
              setPasswordModalVisible(true)
            }}
            style={style.changePasswordBtn}
          >
            <Text style={style.changePasswordText}>Change Password</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default AgentDetailsScreen;

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: width * 0.02,
      paddingVertical: width * 0.01,
    },
    miniCard: {
      backgroundColor: theme.colors.PRIMARYWHITE,
      borderRadius: 10,
      padding: width * 0.04,
      margin: width * 0.02,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
      justifyContent: "center",
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: width * 0.02,
      backgroundColor: theme.colors.PRIMARYWHITE,
      borderRadius: 7,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    headerCard: {
      flex: 1,
      padding: width * 0.02,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 7,
    },
    directionContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    img: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.2,
    },
    heading: {
      fontSize: width * 0.03,
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYBLACK,
    },
    txt: {
      fontSize: width * 0.03,
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYBG,
    },
    saparateContainer: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.PRIMARYBLACK,
      marginVertical: width * 0.03,
    },
    changePasswordBtn: {
      backgroundColor: theme.colors.PRIMARYBG,
      borderRadius: 7,
      paddingVertical: width * 0.03,
      margin: width * 0.02,
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
    changePasswordText: {
      fontSize: width * 0.035,
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYWHITE,
    },
  });
