import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import useThemedStyles from "../hooks/usethemestyle";
import useTheme from "../hooks/useTheme";
import { SvgIcons } from "./SvgIcons";
import { width } from "../utils/Dimensions";

const FormInput = ({
  iconType,
  labelValue,
  placeholderText,
  secureTextEntry,
  type,
  iconName,
  stylecontainer,
  inputstyle,
  iscons = false,
  isLeft = false,
  errorMsg,
  isNum = false,
  ...rest
}) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  const [isSecureEntry, setIsSecureEntry] = useState(false);
  const [rightIcon, setRightIcon] = useState("eye-outline");
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(!focused);
  };

  const borderColor = errorMsg
    ? colors.PRIMARYRED
    : !errorMsg && focused
    ? colors.SECONDARYBG
    : colors.PRIMARYGRAY;
  const elevation = focused ? 4 : 0;
  const borderWidth = focused ? 1.5 : 1.2;
  const shadowOpacity = focused ? 0.7 : 0;
  const shadowOffset = focused ? 0.7 : 0;

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye-outline") {
      setRightIcon("eye-off-outline");
      setIsSecureEntry(!isSecureEntry);
    } else if (rightIcon === "eye-off-outline") {
      setRightIcon("eye-outline");
      setIsSecureEntry(!isSecureEntry);
    }
  };

  return (
    <View>
      <View
        style={[
          style.inputContainer,
          stylecontainer,
          {
            borderColor,
            elevation,
            borderWidth,
            shadowOpacity,
            shadowOffset: {
              width: 0,
              height: shadowOffset,
            },
            shadowColor: colors.PRIMARYGRAY,
          },
        ]}
      >
        {isLeft ? (
          <View style={{ marginLeft: width * 0.01 }}>
            {isNum ? (
              <Text
                style={{
                  fontSize: width * 0.03,
                  fontFamily: "Roboto-Medium",
                  color: colors.PRIMARYGRAY,
                }}
              >
                +91
              </Text>
            ) : (
              <SvgIcons name={iconName} color={colors.PRIMARYGRAY} />
            )}
          </View>
        ) : null}
        <TextInput
          style={[style.input, inputstyle]}
          value={labelValue}
          placeholder={placeholderText}
          numberOfLines={1}
          placeholderTextColor={colors.PRIMARYGRAY}
          {...rest}
          onBlur={onFocus}
          onFocus={onFocus}
          secureTextEntry={
            type == "email" ? null : type == "numeric" ? null : !isSecureEntry
          }
          keyboardType={
            type == "email"
              ? "email-address"
              : type == "numeric"
              ? "numeric"
              : "default"
          }
        />
        {iscons ? (
          <View style={{ marginRight: 6 }}>
            <SvgIcons name={"pencil"} />
          </View>
        ) : null}
        {type == "password" && (
          <Pressable
            style={{
              marginRight: width * 0.001,
              position: "absolute",
              right: width * 0.01,
            }}
            onPress={handlePasswordVisibility}
          >
            {rightIcon ? (
              <SvgIcons
                name={
                  rightIcon == "eye-outline" ? "eye-outline" : "eye-off-outline"
                }
                color={colors.PRIMARYGRAY}
              />
            ) : null}
          </Pressable>
        )}
      </View>
      {errorMsg ? (
        <Text style={style.errorMsg}>{errorMsg}</Text>
      ) : (
        <View style={style.marginBottom} />
      )}
    </View>
  );
};

export default FormInput;

const styles = (theme) =>
  StyleSheet.create({
    inputContainer: {
      marginTop: width * 0.02,
      marginBottom: width * 0.02,
      height: width * 0.11,
      borderRadius: width * 0.02,
      borderWidth: 0.5,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.PRIMARYWHITE,
    },
    input: {
      padding: width * 0.009,
      width: "100%",
      fontSize: width * 0.031,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYBG,
    },
    errorMsg: {
      color: theme.colors.PRIMARYRED,
      fontSize: width * 0.03,
      padding: 2,
      fontFamily: "Roboto-Medium",
    },
    marginBottom: {
      marginBottom: 2,
    },
  });
