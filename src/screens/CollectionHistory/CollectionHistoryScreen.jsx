import React, { useEffect, useState, useContext } from "react";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import AppHeader from "../../components/AppHeader";
import InfoCard from "../../components/Cards/InfoCard";
import CommonTable from "../../components/CommonTable/CommonTable";
import ApiRequest from "../../api";
import { AppContext } from "../../context/AuthContext";
import { currentDate } from "../../utils/CurrentDate";
import DateTimePickerModal from "../../components/DateTimePickerModal/DateTimePickerModal";

const CollectionHistoryScreen = ({ navigation }) => {
  const { agentId } = useContext(AppContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(currentDate()?.fullDate);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState(0);

  const formattedDate = (dueDate) => {
    const date = new Date(dueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return date;
  };

  function formatDate(isoString) {
    return new Date(isoString).toISOString().split("T")[0];
  }

  const getAgentWalletTransactions = async (agentId) => {
    setLoading(true);
    try {
      const response = await ApiRequest.getWalletTransactions(agentId);
      const transactions = response?.data;
      setTransactions(transactions);
    } catch (error) {
      console.error("Collection History :" + error?.toString());
    } finally {
      setLoading(false);
    }
  };

  const getAgentWalletTransactionsByDate = async (agentId, date) => {
    setLoading(true);
    try {
      const response = await ApiRequest.getWalletTransactionsByDate(
        agentId,
        date
      );
      const transactions = response?.data?.transactions;
      setTransactions(transactions);
      setAmount(response?.data?.totalAmount);
    } catch (error) {
      console.error("Collection History :" + error?.toString());
    } finally {
      setLoading(false);
      setDatePickerVisible(false);
    }
  };

  useEffect(() => {
    if (agentId) {
      getAgentWalletTransactions(agentId);
    }
  }, [agentId]);

  // useEffect(() => {
  //   if (agentId) {
  //     getAgentWalletTransactionsByDate(agentId, date);
  //   }
  // }, [agentId, date]);

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
    {
      heading: "Account Number",
      serverKey: "accountNumber",
    },
    { heading: "Product", serverKey: "productName", align: "left" },
    {
      heading: "Amount",
      serverKey: "amount",
    },
    {
      heading: "Collection Date",
      serverKey: "date",
      type: "date",
    },
  ];

  return (
    <SafeAreaContainer>
      <AppHeader
        isLeft
        title={"Collection History"}
        onPress={() => navigation.openDrawer()}
        isLeftIcons={true}
        leftIconName={"menu"}
      />
      {/* <InfoCard
        title={"Total Collection Amount :"}
        date={formattedDate(date)}
        amount={`₹ ${amount}`}
        onPress={() => {
          setDatePickerVisible(true);
        }}
      /> */}
      {/* <DateTimePickerModal
        visible={isDatePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        onConfirm={(date) => {
          setSelectedDate(date);
          setDate(formatDate(date));
          setDatePickerVisible(false);
        }}
        initialDate={selectedDate}
        mode="date"
        title="Choose Date"
      /> */}
      <CommonTable
        TableData={transactions}
        TableStructure={TableStructure}
        loading={loading}
        NoDataMessage="No Transactions Found." 
      />
    </SafeAreaContainer>
  );
};

export default CollectionHistoryScreen;
