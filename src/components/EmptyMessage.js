import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useTheme from "../hooks/useTheme";
import useThemedStyles from "../hooks/usethemestyle";
import { width } from "../utils/Dimensions";

const EmptyMessage = ({ title, subtitle, mainContainer }) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={[style.container, mainContainer]}>
      <Text style={style.txt}>{title}</Text>
      <Text
        style={[
          style.txt,
          { marginTop: width * 0.02, fontSize: width * 0.035 },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyMessage;

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    txt: {
      fontSize: width * 0.045,
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYGRAY,
    },
  });
