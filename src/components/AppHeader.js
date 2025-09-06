import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import useThemedStyles from "../hooks/usethemestyle";
import { SvgIcons } from "./SvgIcons";
import { useNavigation } from "@react-navigation/native";
import { width } from "../utils/Dimensions";

const AppHeader = ({
  title,
  isLeft = false,
  isLeftIcons = false,
  tintColor,
  isLeftIconColor,
  leftIconName,
  rightIconName,
  isRight = false,
  rightcolor,
  onRightPress,
  isRightIcons = false,
  onPress,
  propscontainer,
  isLeftImg = false,
}) => {
  const style = useThemedStyles(styles);
  const navigation = useNavigation();

  return (
    <View
      style={[
        style.container,
        propscontainer,
        { justifyContent: isRightIcons ? "space-between" : null },
      ]}
    >
      {isLeftIcons ? (
        <Pressable onPress={onPress} style={style.righticon}>
          <SvgIcons name={leftIconName} size={width * 0.065} />
        </Pressable>
      ) : (
        <>
          {isLeft ? (
            <Pressable
              onPress={() => navigation.goBack()}
              style={style.righticon}
            >
              <SvgIcons
                name={"back"}
                size={width * 0.065}
                color={isLeftIconColor}
              />
            </Pressable>
          ) : null}
        </>
      )}

      <View
        style={
          isLeft
            ? style.titlecontainer
            : {
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: isLeft ? 0 : 10,
              }
        }
      >
        {isLeftImg ? (
          <Image
            style={{
              width: width * 0.18,
              height: width * 0.12,
              resizeMode: "contain",
              tintColor: tintColor,
            }}
            source={require("../assets/images/digigo.png")}
          />
        ) : (
          <Text numberOfLines={1} ellipsizeMode="tail" style={style.title}>
            {title}
          </Text>
        )}
      </View>
      {isRightIcons && (
        <Pressable onPress={onRightPress} style={style.righticon}>
          <SvgIcons
            name={rightIconName}
            size={width * 0.065}
            color={rightcolor}
          />
        </Pressable>
      )}
    </View>
  );
};

export default AppHeader;

const styles = (theme) =>
  StyleSheet.create({
    container: {
      height: width * 0.13,
      paddingHorizontal: width * 0.001,
      backgroundColor: theme.colors.PRIMARYWHITE,
      flexDirection: "row",
      alignItems: "center",
      elevation: 2,
      shadowColor: theme.colors.PRIMARYGRAY,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
    },
    titlecontainer: {
      justifyContent: "center",
      flexShrink: 1,
    },
    title: {
      fontSize: width * 0.045,
      fontFamily: "Roboto-Medium",
      color: theme.colors.PRIMARYBLACK,
      textAlign: "left",
      textTransform: "capitalize",
    },
    righticon: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: width * 0.005,
      width: width * 0.09,
      height: width * 0.09,
    },
  });
