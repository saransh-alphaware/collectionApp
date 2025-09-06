import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { width } from "../../utils/Dimensions";
import useThemedStyles from "../../hooks/usethemestyle";

const PopupModal = ({
  visible,
  onClose,
  onConfirm,
  message,
  children,
  buttonsText = "",
  buttonsVisible = true,
  confirmText = "Ok",
}) => {
  const style = useThemedStyles(styles);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={style.overlay}>
        <View style={style.modalContainer}>
          {children ? (
            children
          ) : (
            <Text style={style.modalMessage}>{message}</Text>
          )}
          {buttonsVisible ? (
            <View style={style.buttonsContainer}>
              <TouchableOpacity
                style={[style.button, style.cancelButton]}
                onPress={onClose}
              >
                <Text style={style.buttonText}>Close</Text>
              </TouchableOpacity>
              {onConfirm && (
                <TouchableOpacity
                  style={[style.button, style.okButton]}
                  onPress={onConfirm}
                >
                  <Text style={style.buttonText}>{confirmText}</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            buttonsText?.toString()?.length > 0 && (
              <View style={{
                alignItems: "center",
              }}>
                <Text style={{ ...style.modalMessage, color: "#F00" }}>
                  {buttonsText}
                </Text>
                <TouchableOpacity
                  style={[style.button, style.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={style.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;

const styles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
      backgroundColor: theme.colors.PRIMARYWHITE,
      borderRadius: 10,
      padding: width * 0.05,
      width: width * 0.8,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    modalMessage: {
      fontFamily: "Roboto-Regular",
      fontSize: width * 0.045,
      color: theme.colors.PRIMARYBLACK,
      textAlign: "center",
      marginBottom: width * 0.05,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    button: {
      backgroundColor: theme.colors.PRIMARYBLUE,
      borderRadius: 5,
      paddingVertical: width * 0.02,
      paddingHorizontal: width * 0.1,
      marginHorizontal: width * 0.02,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Roboto-Bold",
      fontSize: width * 0.04,
      color: theme.colors.PRIMARYWHITE,
      textAlign: "center",
    },
    cancelButton: {
      backgroundColor: theme.colors.PRIMARYRED,
    },
    okButton: {
      backgroundColor: theme.colors.PRIMARYBG,
    },
  });
