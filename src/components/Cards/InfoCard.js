import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgIcons } from "../SvgIcons";
import { width } from "../../utils/Dimensions";
import useThemedStyles from "../../hooks/usethemestyle";

const InfoCard = ({ title, iconName, amount, info, onPress, date }) => {
  const style = useThemedStyles(styles);
  return (
    <TouchableOpacity style={style.cardContainer} onPress={onPress}>
      <View style={style.row}>
        <Text style={style.cardTitle}>{title}</Text>
        {date && <Text style={style.cardInfo}>{date}</Text>}
        {iconName && <SvgIcons name={iconName} style={style.cardIcon} />}
      </View>
      <View style={style.row}>
        <Text style={style.cardAmount}>{amount}</Text>
      </View>
      {info && (
        <View style={style.row}>
          <Text style={style.cardInfo}>{info}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default InfoCard;

const styles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.colors.PRIMARYWHITE,
      borderRadius: 10,
      padding: width * 0.04,
      margin: width * 0.02,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: width * 0.02,
    },
    cardTitle: {
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.04,
      color: theme.colors.PRIMARYBLACK,
    },
    cardIcon: {
      width: width * 0.06,
      height: width * 0.06,
    },
    cardAmount: {
      fontFamily: "Roboto-Bold",
      fontSize: width * 0.085,
      color: theme.colors.PRIMARYBLACK,
    },
    cardInfo: {
      fontFamily: "Roboto-Regular",
      fontSize: width * 0.035,
      color: theme.colors.PRIMARYGRAY,
    },
  });
