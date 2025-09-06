import { View, Text, StyleSheet } from "react-native";
import { width } from "../utils/Dimensions";
import useThemedStyles from "../hooks/usethemestyle";
import { currentDate } from "../utils/CurrentDate";

const Recipet = ({ recipetData }) => {
  const style = useThemedStyles(styles);
  const currDate = currentDate();

  // Format the date to be more readable
  const formattedDate = (dueDate) => {
    const date = new Date(dueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return date;
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Payment Recipet</Text>

      <View style={style.detailRow}>
        <Text style={style.label}>Customer Name:</Text>
        <Text style={style.value}>{recipetData?.customerName}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Account Number:</Text>
        <Text style={style.value}>{recipetData?.accountNumber}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Product:</Text>
        <Text style={style.value}>{recipetData?.productName}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Term:</Text>
        <Text style={style.value}>{recipetData?.currentTerm}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Premium Amount:</Text>
        <Text style={style.value}>₹ {recipetData?.installmentamount}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Late Fees:</Text>
        <Text style={style.value}>₹ {recipetData?.totalLateFee || 0}</Text>
      </View>

      <View style={style.detailRow}>
        <Text style={style.label}>Total Amount:</Text>
        <Text style={style.value}>
          ₹{" "}
          {Number(recipetData?.totalLateFee || 0) +
            Number(recipetData?.installmentamount || 0)}
        </Text>
      </View>
      <View style={style.detailRow}>
        <Text style={style.label}>Current Balance :</Text>
        <Text style={style.value}>₹ {recipetData?.currentBalance}</Text>
      </View>
      <View style={style.detailRow}>
        <Text style={style.label}>Due Date:</Text>
        <Text style={style.value}>
          {formattedDate(recipetData?.nextEmiDate)}
        </Text>
      </View>
      <View style={style.detailRow}>
        <Text style={style.label}>Last Paid Date:</Text>
        <Text style={style.value}>
          {formattedDate(recipetData?.lastPaidDate)}
        </Text>
      </View>
      <View style={style.detailRow}>
        <Text style={style.label}>Transaction Date:</Text>
        <Text style={style.value}>{formattedDate(currDate?.fullDate)}</Text>
      </View>
      <View style={style.detailRow}>
        <Text style={style.label}>Agent Name:</Text>
        <Text style={style.value}>{recipetData?.agentUserName}</Text>
      </View>
      <View style={style.detailRow}>
        <Text style={style.label}>Agent Number:</Text>
        <Text style={style.value}>{recipetData?.agentNumber}</Text>
      </View>
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
  });

export default Recipet;
