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
import { showError } from "../../utils/ToastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import CommonTableV2 from "../../components/CommonTable/CommonTableV2";

const PastCollectionScreen = ({ navigation }) => {
  const { agentId, setAgentData } = useContext(AppContext);
  const style = useThemedStyles(styles);
  const [searchValue, setSearchValue] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const isFocused = useIsFocused();

  const [page, setPage] = useState(0); // Start from page 0 as per API
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10; // Number of items per page

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(0); // Reset page
    setCustomerData([]); // Clear data
    setHasMore(true); // Reset hasMore
    await getCustomerDetails(agentId, "", 0); // Fetch first page
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
      setWalletBalance(walletData?.walletBalance);
    } catch (error) {
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
  ];

  const getCustomerDetails = async (agentId, value = "", pageNum = 0) => {
    if (!hasMore && pageNum !== 0) return; // Stop if no more data
    setLoading(true);
    try {
      let queryParam = "";
      const parsedNumber = Number(value);
      const isNumeric = !isNaN(parsedNumber) && value !== "";
      if (isNumeric) {
        queryParam = `customerId=${parsedNumber}`;
      } else if (value) {
        queryParam = `customerName=${value}`;
      }

      // Fetch data with pagination
      const response = await ApiRequest.getCustomerTestingList(pageSize, pageNum, queryParam);
      const responseData = response?.data?.map((data) => ({
        id: data?.id,
        customerId: data?.customerId,
        customerName: `${data?.firstName} ${data?.middleName} ${data?.lastName}`.trim(),
        noOfProduct: "",
        totalDue: "",
      }));

      // Update state
      setCustomerData((prevData) => {
        if (pageNum === 0) {
          return responseData || []; // Replace data for first page or search
        }
        return [...prevData, ...responseData]; // Append for subsequent pages
      });

      // Check if more data is available
      setHasMore(responseData.length === pageSize);
      if (responseData.length > 0 && pageNum === 0) {
        setPage(1); // Set to next page after first fetch
      } else if (responseData.length > 0) {
        setPage(pageNum + 1); // Increment page
      }
    } catch (error) {
      console.error("Customer Details : " + error?.toString());
      showError("Failed to fetch customer data");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = useCallback(() => {
    if (loading || !hasMore) return;
    getCustomerDetails(agentId, searchValue.trim(), page);
  }, [agentId, searchValue, page, loading, hasMore]);

  useEffect(() => {
    if (agentId && isFocused) {
      getAgentDetils(agentId);
      getAgentWalletDeatils(agentId);
      setPage(0); // Reset page on focus
      setCustomerData([]); // Clear data
      setHasMore(true); // Reset hasMore
      getCustomerDetails(agentId, searchValue.trim(), 0); // Fetch first page
    }
  }, [agentId, isFocused]);

  useEffect(() => {
    if (isFocused) {
      const handler = setTimeout(() => {
        if (searchValue?.trim()?.length > 2 || searchValue?.trim() === "") {
          setPage(0); // Reset page on search
          setCustomerData([]); // Clear data
          setHasMore(true); // Reset hasMore
          getCustomerDetails(agentId, searchValue.trim(), 0);
        }
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [agentId, searchValue, isFocused]);

  return (
    <SafeAreaContainer>
      {/* <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > */}
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
        <CommonTableV2
          TableStructure={TableStructure}
          TableData={customerData}
          loading={loading}
          onPress={(customer) =>
            navigation.navigate("CustomerDetail", customer)
          }
          fetchMoreData={fetchMoreData} // Pass fetchMoreData
        />
      {/* </ScrollView> */}
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