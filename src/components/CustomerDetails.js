import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { width } from "../utils/Dimensions";
import useThemedStyles from "../hooks/usethemestyle";
import ApiRequest from "../api";
import ActivityLoader from "./ActivityLoader";
import { currentDate } from "../utils/CurrentDate";
import PopupModal from "./PopupModal/PopupModal";
import { AppContext } from "../context/AuthContext";
import { showSuccess } from "../utils/ToastMessage";
import Recipet from "./Recipet";

const CustomerDetails = ({
  customerDetails,
  isModalVisible,
  setModalVisible,
  setParentModalVisble = () => {},
  setflag,
  flag,
  setPaymentLoading,
  setButtonsVisible,
  setButtonsText,
}) => {
  const { agentData, agentId, hasWalletAccount } = useContext(AppContext);
  const style = useThemedStyles(styles);
  const [accountDetails, setAccountDeatils] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reciptModal, setReciptModal] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);

  const { id, depositAccountType, branchId, branchName } = customerDetails;

  // Format the date to be more readable
  const formattedDate = (dueDate) => {
    const date = new Date(dueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return date;
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    if (depositAccountType === "RECURRING_DEPOSIT_ACCOUNT") {
      PayRDInstallment();
    }
    if (depositAccountType === "DDS_ACCOUNT") {
      PayDDSInstallment();
    }
    setModalVisible(false);
  };

  async function PayRDInstallment() {
    setPaymentLoading(true);
    try {
      const RdPayload = {
        accountId: accountDetails?.id,
        accountNumber: accountDetails?.accountNumber,
        branchId: branchId,
        branchName,
        currentTerm: accountDetails?.currentTerm,
        transactionRequests: {
          premiumAmount: [
            {
              amount: accountDetails?.installmentamount || 0,
              paymentType: "CASH",
              timeOfTransaction: new Date()?.toISOString(),
              transactionRemark: `${agentData?.agentUserName} (${agentData?.agentNumber}) Paid Primium Using Wallet`,
              clearanceStatus: "PENDING",
              receiptNumber: null,
              receivedBy: "Admin",
              handedOverBy: agentData?.agentUserName || "Admin",
              purpose: `${agentData?.agentUserName} (${agentData?.agentNumber}) Paid Primium Using Wallet`,
              paymentStatus: "PAYMENT_PENDING",
            },
          ],
        },
      };

      if (
        accountDetails?.missedMonthDetails &&
        accountDetails?.missedMonthDetails?.length > 0
      ) {
        RdPayload.transactionRequests.lateFeesAndGst = [
          {
            amount: accountDetails?.totalLateFee, // late fee amount
            latecharges: accountDetails?.charges, // actual late fee
            gstFee: accountDetails?.gst, // GST amount
            paymentType: "CASH",
            transactionRemark: `${agentData?.agentUserName} (${agentData?.agentNumber}) Paid Primium Using Wallet And Late Fees`,
            paymentStatus: "PAYMENT_PENDING",
          },
        ];
      }
      // await new Promise((resolve) => setTimeout(resolve, 20000));
      // return;

      console.log("RdPayload :>> ", JSON.stringify(RdPayload));
      console.log("object :>> ", RdPayload);
      const response = await ApiRequest.payRDRenewal(RdPayload, agentId);
      setCurrentBalance(response?.data?.currentBalance)
      console.log("object :>> ", response);
      showSuccess(response?.message || "RD RENEWAL COMPLETED");
      setReciptModal(true);
      setflag(!flag);
    } catch (error) {
      console.log("error :>> ", error);
      console.error("RD Renewal: " + error?.toString());
    } finally {
      // setParentModalVisble(false);
      setPaymentLoading(false);
    }
  }

  async function PayDDSInstallment() {
    setPaymentLoading(true);
    try {
      const DDSPayload = {
        accountId: accountDetails?.id,
        paymentType: "CASH",
        amount: accountDetails?.installmentamount || 0,
        timeOfTransaction: new Date()?.toISOString(),
        receiptNumber: null,
        receivedBy: "Admin",
        handedOverBy: agentData?.agentUserName || "Admin",
        purpose: `${agentData?.agentUserName} (${agentData?.agentNumber}) Paid Primium Using Wallet`,
        clearanceStatus: "PENDING",
        paymentStatus: "PAYMENT_PENDING",
        branchId: branchId,
        transactionRemark: `${agentData?.agentUserName} (${agentData?.agentNumber}) Paid Primium Using Wallet`,
        transactionModule: "DDS_RENEWAL",
        currentTerm: accountDetails?.currentTerm,
      };

      console.log("agentId :>> ", agentId);
      console.log("DDSPayload :>> ", JSON.stringify(DDSPayload));
      const response = await ApiRequest.payDDSRenewal(DDSPayload, agentId);
      setCurrentBalance(response?.data?.currentBalance )
      showSuccess(response?.message || "DDS RENEWAL COMPLETED");
      console.log("object :>> ", response);
      setReciptModal(true);
      setflag(!flag);
    } catch (error) {
      console.error("DDS Renewal :" + error?.toString());
    } finally {
      // setParentModalVisble(false);
      setPaymentLoading(false);
    }
  }

  async function fetchAccountDetails(accountId) {
    setLoading(true);
    try {
      const response = await ApiRequest.getAccountsDetails(
        accountId,
        currentDate()?.fullDate
      );
      console.log("response?.data :>> ", response?.data);
      const accountPaymentDetails = response?.data;
      setAccountDeatils(accountPaymentDetails);
      if (!hasWalletAccount) {
        setButtonsVisible(false);
        setButtonsText("You don’t have a wallet. Please contact the branch.");
        return;
      }
      if (
        accountPaymentDetails?.missedMonthDetails &&
        accountPaymentDetails?.missedMonthDetails?.length > 0
      ) {
        setButtonsVisible(true);
        // setButtonsText("You cannot pay late fees. Please contact the branch.");
      } else {
        setButtonsVisible(true);
        setButtonsText("");
      }
    } catch (error) {
      console.error("Account Details :" + error?.toString());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (customerDetails?.id) {
      fetchAccountDetails(customerDetails?.id);
    }
  }, [customerDetails?.id]);

  useEffect(() => {
    return () => {
      setButtonsVisible(false);
      setButtonsText("");
    };
  }, []);

  if (loading) {
    return <ActivityLoader />;
  }

  return (
    <View style={style.container}>
      <PopupModal
        visible={isModalVisible}
        onClose={hideModal}
        onConfirm={handleConfirm}
        confirmText={"Pay"}
        message="Are you sure you want to pay Amount?"
      ></PopupModal>
      <PopupModal
        visible={reciptModal}
        onClose={() => {
          setParentModalVisble(false); 
          setReciptModal(false);
        }}
      >
        <Recipet
          recipetData={{
            ...accountDetails,
            ...agentData,
            currentBalance
          }}
        />
      </PopupModal>
      <Text style={style.title}>Payment Details</Text>

      <View style={style.detailRow}>
        <Text style={style.label}>Customer:</Text>
        <Text style={style.value}>{accountDetails?.customerName}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Account Number:</Text>
        <Text style={style.value}>{accountDetails?.accountNumber}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Product:</Text>
        <Text style={style.value}>{accountDetails?.productName}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Term:</Text>
        <Text style={style.value}>{accountDetails?.currentTerm}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Premium Amount:</Text>
        <Text style={style.value}>₹ {accountDetails?.installmentamount}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Late Fees:</Text>
        <Text style={style.value}>₹ {accountDetails?.totalLateFee || 0}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Total Amount:</Text>
        <Text style={style.value}>
          ₹{" "}
          {Number(accountDetails?.totalLateFee || 0) +
            Number(accountDetails?.installmentamount || 0)}
        </Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Due Date:</Text>
        <Text style={style.value}>
          {formattedDate(accountDetails?.nextEmiDate)}
        </Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Last Paid Date:</Text>
        <Text style={style.value}>
          {formattedDate(accountDetails?.lastPaidDate)}
        </Text>
      </View>

      {/* <View style={style.detailRow}>
        <Text style={style.label}>Status:</Text>
        <Text
          style={[
            style.value,
            style.statusText,
            status === "Pending"
              ? style.pendingStatus
              : status === "Paid"
              ? style.paidStatus
              : style.otherStatus,
          ]}
        >
          {status}
        </Text>
      </View> */}
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical: width * 0.02,
    },
    title: {
      fontFamily: "Roboto-Bold",
      fontSize: width * 0.05,
      color: theme.colors.PRIMARYBLACK,
      marginBottom: width * 0.04,
      textAlign: "center",
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: width * 0.015,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.PRIMARYGRAY + "30", // 30% opacity
    },
    label: {
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.04,
      color: theme.colors.PRIMARYBLACK + "80", // 80% opacity
    },
    value: {
      fontFamily: "Roboto-Regular",
      fontSize: width * 0.04,
      color: theme.colors.PRIMARYBLACK,
      maxWidth: "60%",
      textAlign: "right",
    },
    statusText: {
      fontFamily: "Roboto-Bold",
      paddingHorizontal: width * 0.02,
      paddingVertical: width * 0.005,
      borderRadius: 4,
    },
    pendingStatus: {
      backgroundColor: "#FFF8E1",
      color: "#F57C00",
    },
    paidStatus: {
      backgroundColor: "#E8F5E9",
      color: "#2E7D32",
    },
    otherStatus: {
      backgroundColor: "#EDE7F6",
      color: "#5E35B1",
    },
  });

export default CustomerDetails;
