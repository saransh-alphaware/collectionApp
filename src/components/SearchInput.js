import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import useTheme from "../hooks/useTheme";
import useThemedStyles from "../hooks/usethemestyle";
import { SvgIcons } from "./SvgIcons";
import { width } from "../utils/Dimensions";

const SearchInput = ({
  placeholder,
  value,
  onChangeText,
  onClose,
  maincontainer,
  inputcontainer,
}) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={[style.container, maincontainer]}>
      <SvgIcons name={"search"} color={colors.PRIMARYGRAY} />
      <TextInput
        placeholder={placeholder || "Search"}
        placeholderTextColor={colors.PRIMARYGRAY}
        value={value}
        onChangeText={onChangeText}
        style={[style.input, inputcontainer]}
      />
      {value !== "" && (
        <Pressable onPress={onClose}>
          <SvgIcons name={"cross"} color={colors.PRIMARYRED} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchInput;

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.PRIMARYWHITE,
      padding: width * 0.009,
      margin: width * 0.02,
      borderWidth: width * 0.001,
      borderColor: theme.colors.PRIMARYGRAY,
      borderRadius: width * 0.012,
      height: width * 0.12,
    },
    input: {
      flex: 1,
      paddingHorizontal: width * 0.009,
      paddingVertical: width * 0.005,
      fontSize: width * 0.04,
      fontFamily: "Roboto-Regular",
      color: theme.colors.PRIMARYBG,
    },
  });
