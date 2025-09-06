import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import useThemedStyles from "../hooks/usethemestyle";
import { width } from "../utils/Dimensions";
import ActivityLoader from "./ActivityLoader";

const Button = ({ title, onPress, btncontainer, btnprops, loading }) => {
  const style = useThemedStyles(styles);

  return (
    <TouchableOpacity
      style={[style.btnContainer, btncontainer]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityLoader loaderColor={"#FFF"} size={24} />
      ) : (
        <Text style={[style.btntitle, btnprops]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = (theme) =>
  StyleSheet.create({
    btnContainer: {
      padding: width * 0.025,
      backgroundColor: theme.colors.PRIMARYBG,
      width: "100%",
      borderRadius: width * 0.02,
      justifyContent: "center",
      alignItems: "center",
    },
    btntitle: {
      fontSize: width * 0.042,
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYWHITE,
    },
  });
