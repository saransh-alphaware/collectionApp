import { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { width } from "../utils/Dimensions";
import useThemedStyles from "../hooks/usethemestyle";
import ApiRequest from "../api";
import PopupModal from "./PopupModal/PopupModal";
import { AppContext } from "../context/AuthContext";
import { showSuccess, showError } from "../utils/ToastMessage";
import FormInput from "./FormInput";
import GlobalBlurLoader from "./Loaders/GlobalBlurLoader";
import { navigationRef } from "../navigations/navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = ({ passwordModalVisible, setPasswordModalVisible }) => {
  const { agentData } = useContext(AppContext);
  const style = useThemedStyles(styles);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePasswordConfirm = () => {
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmNewPassword.trim();

    if (!trimmedNewPassword || !trimmedConfirmPassword) {
      showError("Both fields are required and cannot be only spaces.");
      return;
    }
    if (trimmedNewPassword.length < 6) {
      showError(
        "Password must be at least 6 characters long (excluding spaces)."
      );
      return;
    }
    if (trimmedNewPassword !== trimmedConfirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    setModalVisible(true);
  };

  const handleConfirm = async () => {
    setModalVisible(false);
    setLoading(true);
    try {
      const payload = {
        userId: agentData?.agentNumber,
        password: newPassword,
      };
      const response = await ApiRequest.resetPassword(payload);
      await AsyncStorage.clear();
      navigationRef.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      showSuccess(response?.message);
    } catch (error) {
      console.error(error?.toString());
    } finally {
      setPasswordModalVisible(false);
      setLoading(false);
    }
  };

  if (loading) {
    return <GlobalBlurLoader />;
  }

  return (
    <PopupModal
      visible={passwordModalVisible}
      onClose={() => {
        setPasswordModalVisible(false);
      }}
      onConfirm={handlePasswordConfirm}
      confirmText={"Update"}
    >
      <View style={style.container}>
        <PopupModal
          visible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          onConfirm={handleConfirm}
          confirmText={"Yes"}
          message="Are you sure you want to update your password?"
        ></PopupModal>
        <Text style={style.title}>Change Password</Text>
        <Text style={style.label}>New Password</Text>
        <FormInput
          isLeft
          type={"password"}
          iconName={"lock"}
          value={newPassword}
          placeholderText={"Enter your New password."}
          stylecontainer={{ width: "100%" }}
          onChangeText={setNewPassword}
        />
        <Text style={style.label}>Confirm New Password</Text>
        <FormInput
          isLeft
          type={"password"}
          iconName={"lock"}
          value={confirmNewPassword}
          placeholderText={"Confirm your password"}
          stylecontainer={{ width: "100%" }}
          onChangeText={setConfirmNewPassword}
        />
      </View>
    </PopupModal>
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
    label: {
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.04,
      color: theme.colors.PRIMARYBLACK + "80",
    },
  });

export default ChangePassword;
