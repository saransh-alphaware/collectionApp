import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import SafeAreaContainer from "../components/SafeAreaContainer";
import AppHeader from "../components/AppHeader";
import useThemedStyles from "../hooks/usethemestyle";
import useTheme from "../hooks/useTheme";
import { width } from "../utils/Dimensions";
import { currentDate } from "../utils/CurrentDate";
import PopupModal from "../components/PopupModal/PopupModal";
import CommonTable from "../components/CommonTable/CommonTable";
import CustomerDetails from "../components/CustomerDetails";
import ApiRequest from "../api";
import GlobalBlurLoader from "../components/Loaders/GlobalBlurLoader";
import { showSuccess } from "../utils/ToastMessage";

const CustomerDetailScreen = ({ route }) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);
  const currDate = currentDate();
  const { customerId, customerName, branchId, branchName } = route.params;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisiblePay, setModalVisiblePay] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [buttonsText, setButtonsText] = useState("");

  const [accountDetails, setAccountDeatils] = useState();
  const [flag, setflag] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setModalVisiblePay(true);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (!customerId) return;

    setLoading(true);

    const { response, cancel } = ApiRequest.getCustomerRenewalList(
      customerId,
      currDate?.fullDate
    );

    response
      .then((res) => {
        setTableData(res?.data);
        showSuccess(res?.message);
      })
      .catch((err) => {
        if (err.name === "CanceledError") {
          console.log("Request cancelled");
        } else {
          console.error("API error:", err);
          // showError("Renewal Product: " + err.toString());
        }
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });

    // Return cancel function for cleanup

    return () => {
      console.log("UseAborted :>>");
      // setRefreshing(false);

      cancel();
    };
  }, [customerId, flag]);

  const TableStructure = [
    {
      heading: "Account Number",
      serverKey: "accountNumber",
    },
    {
      heading: "Product Name",
      serverKey: "productName",
      align: "left",
    },
    {
      heading: "Product Short Name",
      serverKey: "productShortName",
    },
    // { heading: "Due Amount", serverKey: "dueAmount" },
    {
      heading: "Due Date",
      serverKey: "nextEmiDate",
      type: "date",
    },
    {
      heading: "Account Status",
      serverKey: "accountStatus",
    },
  ];

  const getCustomerDetails = async (customerId) => {
    setLoading(true);
    try {
      // let { response, cancel } = await ApiRequest.getCustomerRenewalList(
      //   customerId,
      //   currDate?.fullDate
      // );
      // setTableData(response?.data);
      // showSuccess(response?.message);
      // return cancel;
    } catch (error) {
      // showError("Renewal Product :" + error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!customerId) return;

    setLoading(true);

    const { response, cancel } = ApiRequest.getCustomerRenewalList(
      customerId,
      currDate?.fullDate
    );

    response
      .then((res) => {
        setTableData(res?.data);
        // showSuccess(res?.message);
      })
      .catch((err) => {
        // console.log(' err?.name :>> ', err?.name);
        if (err.name === "CanceledError") {
          console.log("Request cancelled");
        } else {
          console.error("API error:", err);
          // showError("Renewal Product: " + err.toString());
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // Return cancel function for cleanup
    return () => {
      console.log("Aborted :>>");
      cancel();
    };
  }, [customerId, flag]);

  return (
    <SafeAreaContainer>
       <GlobalBlurLoader visible={paymentLoading} />
      <AppHeader isLeft title={"Customer Details"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   loading ? null : (
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   )
        // }
      >
        <View style={style.customerContainer}>
          <Image
            style={style.profileImg}
            source={require("../assets/images/ttms.png")}
          />
          <View>
            <View style={style.maincustomer}>
              <Text
                style={[
                  style.customername,
                  { color: colors.PRIMARYBLACK, marginRight: width * 0.01 },
                ]}
              >
                Name :
              </Text>
              <Text style={style.customername}>{customerName}</Text>
            </View>
            <View style={style.maincustomer}>
              <Text
                style={[
                  style.customername,
                  { color: colors.PRIMARYBLACK, marginRight: width * 0.01 },
                ]}
              >
                ID :
              </Text>
              <Text style={style.customername}>{customerId}</Text>
            </View>
          </View>
        </View>
        <PopupModal
          visible={isModalVisible}
          onClose={hideModal}
          onConfirm={handleConfirm}
          confirmText={"Pay"}
          buttonsVisible={buttonsVisible}
          buttonsText={buttonsText}
        >
          <CustomerDetails
            customerDetails={{
              id: accountDetails?.id,
              depositAccountType: accountDetails?.depositAccountType,
              branchId: branchId,
              branchName: branchName,
              // status: "Pending",
            }}
            isModalVisible={isModalVisiblePay}
            setModalVisible={setModalVisiblePay}
            setParentModalVisble={setModalVisible}
            setflag={setflag}
            flag={flag}
            setPaymentLoading={setPaymentLoading}
            setButtonsVisible={setButtonsVisible}
            setButtonsText={setButtonsText}
          />
        </PopupModal>
        <CommonTable
          TableStructure={TableStructure}
          TableData={tableData}
          loading={loading}
          onPress={(accounts) => {
            showModal();
            setAccountDeatils({ ...accounts, branchId: branchId });
          }}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default CustomerDetailScreen;

const styles = (theme) =>
  StyleSheet.create({
    customerContainer: {
      padding: width * 0.04,
      flexDirection: "row",
    },
    maincustomer: {
      maxWidth: "90%",
      flexDirection: "row",
    },
    profileImg: {
      width: width * 0.15,
      height: width * 0.15,
      resizeMode: "contain",
      marginRight: width * 0.04,
      borderRadius: width * 0.15,
      backgroundColor: theme.colors.PRIMARYWHITE,
    },
    customername: {
      fontSize: width * 0.04,
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYBG,
      maxWidth: "90%",
    },
  });
