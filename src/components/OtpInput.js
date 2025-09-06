import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import useThemedStyles from "../hooks/usethemestyle";
import useTheme from "../hooks/useTheme";
import { width } from "../utils/Dimensions";

const OTPInput = ({ otp, setOTP }) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);
  const inputRefs = useRef([]);

  const [onFocused, setOnFocused] = useState(0);

  const handleChange = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP.join(""));

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP.join(""));
    } else if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onfocused = (index) => {
    setOnFocused(index);
  };

  return (
    <View style={style.container}>
      {Array.from({ length: 4 }).map((_, index) => (
        <TextInput
          key={index}
          style={[
            style.input,
            {
              borderColor:
                onFocused === index ? colors.PRIMARYBG : colors.PRIMARYWHITE,
              borderWidth: onFocused === index ? 1.5 : 0.8,
              elevation: onFocused === index ? 4 : 2,
              shadowOpacity: onFocused === index ? 0.5 : 0,
              shadowOffset: {
                width: 0,
                height: onFocused === index ? 1.5 : 0.5,
              },
              shadowColor:
                onFocused === index ? colors.PRIMARYBG : colors.PRIMARYWHITE,
              backgroundColor:
                onFocused === index ? colors.PRIMARYWHITE : colors.PRIMARYBG,
              color:
                onFocused === index ? colors.PRIMARYBG : colors.PRIMARYWHITE,
            },
          ]}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          onFocus={() => onfocused(index)}
        />
      ))}
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
    },
    input: {
      height: width * 0.12,
      width: width * 0.12,
      borderWidth: 1,
      marginHorizontal: width * 0.01,
      textAlign: "center",
      borderRadius: width * 0.01,
      fontSize: width * 0.035,
      fontFamily: "Roboto-Medium",
    },
  });

export default OTPInput;
