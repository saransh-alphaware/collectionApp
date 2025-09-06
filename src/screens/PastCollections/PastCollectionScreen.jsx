import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import SearchInput from "../../components/SearchInput";
import useThemedStyles from "../../hooks/usethemestyle";
import { width } from "../../utils/Dimensions";
import { SvgIcons } from "../../components/SvgIcons";
import ApiRequest from "../../api";
import { AppContext } from "../../context/AuthContext";
import CommonTable from "../../components/CommonTable/CommonTable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const PastCollectionScreen = ({ navigation }) => {
  const { agentId, setAgentData, setHasWalletAccount} = useContext(AppContext);
  const style = useThemedStyles(styles);
  const [searchValue, setSearchValue] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const isFocused = useIsFocused();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getCustomerDetails(agentId);
    await getAgentWalletDeatils(agentId);
    setRefreshing(false);
  }, [agentId]);

  const getAgentDetils = async (agentId) => {
    try {
      const response = await ApiRequest.getAgentData(agentId);
      const AgentData = response?.data;
      const userData = {
        agentNumber: AgentData?.agentNumber || "",
        referAgentId: AgentData?.reffredAgentById?.agentNumber || "",
        agentUserName: AgentData?.agentUserName || "",
        joiningDate: AgentData?.joiningDate || "",
        agentRank: {
          rank: AgentData?.rank || "",
          rankName: AgentData?.rankName || "",
        },
        customer: {
          id: AgentData?.customerDTO?.id || "",
          mobileNumber: AgentData?.customerDTO?.mobileNumber || "",
          email: AgentData?.customerDTO?.email || "",
          firstName: AgentData?.customerDTO?.firstName || "",
          middleName: AgentData?.customerDTO?.middleName || "",
          lastName: AgentData?.customerDTO?.lastName || "",
          gender: AgentData?.customerDTO?.gender || "",
          birthDate: AgentData?.customerDTO?.birthDate || "",
        },
        office: {
          countryToOffice: AgentData?.officeData?.countryToOffice?.name || "",
          districtToOffice: AgentData?.officeData?.districtToOffice?.name || "",
          stateToOffice: AgentData?.officeData?.stateToOffice?.state || "",
        },
      };
      await AsyncStorage.setItem("agentDetails", JSON.stringify(userData));
      setAgentData(userData);
    } catch (error) {
      console.error("Agent Details : " + error?.toString());
    }
  };

  const getAgentWalletDeatils = async (agentId) => {
    try {
      const walletData = await ApiRequest.getWalletDetails(agentId);
      const balance = Number(walletData?.data?.walletBalance || 0);
      setWalletBalance(Number.isInteger(balance) ? balance : parseFloat(balance.toFixed(2)));
      setHasWalletAccount(true);
    } catch (error) {
      setWalletBalance(0);
      setHasWalletAccount(false);
      console.error("Agent Wallet : " + error?.toString());
    }
  };

  const TableStructure = [
    {
      heading: "Customer Id",
      serverKey: "customerId",
    },
    {
      heading: "Customer Name",
      serverKey: "customerName",
      align: "left",
    },
    // {
    //   heading: "Number Of Product",
    //   serverKey: "noOfProduct",
    // },
    // { heading: "Due Amount", serverKey: "totalDue" },
  ];

  const getCustomerDetails = async (agentId, value="") => {
    setLoading(true);
    try {
      let queryParam = null;

      const parsedNumber = Number(value);
      const isNumeric = !isNaN(parsedNumber) && value !== "";
      if (isNumeric) {
        queryParam = `customerId=${parsedNumber}`;
      } else {
        queryParam = `customerName=${value}`;
      }
      const response = await ApiRequest.getCustomerList(agentId, queryParam);
      const responseData = response?.data?.map((data) => ({
        id: data?.id,
        customerId: data?.customerId,
        customerName:
          `${data?.firstName} ${data?.middleName} ${data?.lastName}`.trim(),
        noOfProduct: "",
        totalDue: "",
        branchId: data?.branchId,
        branchName: data?.branchName,
      }));
      setCustomerData(responseData || []);
    } catch (error) {
      console.error(error?.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentId) {
      getAgentDetils(agentId);
    }
  }, [agentId]);

  useEffect(() => {
    if(isFocused){
      const handler = setTimeout(() => {
        if (searchValue?.trim()?.length > 2 || searchValue?.trim() === "") {
          getCustomerDetails(agentId, searchValue.trim());
        }
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [agentId, searchValue, isFocused]);

  useEffect(() => {
    if(isFocused){
      if (agentId) {
        getAgentWalletDeatils(agentId);
      }
    }
  }, [agentId, isFocused]);


  return (
    <SafeAreaContainer>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={style.maincontainer}>
          <View style={style.headercontainer}>
            <Pressable onPress={() => navigation.openDrawer()}>
              <SvgIcons name={"menu"} />
            </Pressable>
            <Text style={style.heading}>Collection</Text>
          </View>
          <View style={style.walletContainer}>
            <SvgIcons viewBox={"0 -4 24 24"} color={"#FFF"} name={"wallet"} />
            <Text style={style.walletText}>₹ {walletBalance}</Text>
          </View>
        </View>
        <SearchInput
          placeholder={"Search by Name/CustomerId"}
          value={searchValue}
          onChangeText={(val) => setSearchValue(val)}
          onClose={() => setSearchValue("")}
        />
        <CommonTable
          TableStructure={TableStructure}
          TableData={customerData}
          loading={loading}
          onPress={(customer) =>
            navigation.navigate("CustomerDetail", customer)
          }
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default PastCollectionScreen;

const styles = (theme) =>
  StyleSheet.create({
    maincontainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headercontainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: width * 0.02,
      justifyContent: "space-between",
    },
    heading: {
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.04,
      color: theme.colors.PRIMARYBLACK,
      marginLeft: width * 0.02,
    },
    walletContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: width * 0.01,
      paddingHorizontal: width * 0.02,
      backgroundColor: theme.colors.PRIMARYBG,
      borderRadius: width * 0.5,
      marginRight: width * 0.02,
    },
    walletText: {
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.04,
      color: theme.colors.PRIMARYWHITE,
    },
  });
