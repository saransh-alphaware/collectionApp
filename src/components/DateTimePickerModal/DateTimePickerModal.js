import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { width } from "../../utils/Dimensions";
import useThemedStyles from "../../hooks/usethemestyle";

const DateTimePickerModal = ({
  visible,
  onClose,
  onConfirm,
  initialDate = new Date(),
  mode = "date", // 'date', 'time', or 'datetime'
  title = "Select Date",
}) => {
  const style = useThemedStyles(styles);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [showIosPicker, setShowIosPicker] = useState(true);
  const [currentMode, setCurrentMode] = useState(
    mode === "datetime" ? "date" : mode
  );

  const onChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);

    if (Platform.OS === "android") {
      if (mode === "datetime" && currentMode === "date") {
        setCurrentMode("time");
      }
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
    onClose();
  };

  // For iOS, show DateTime picker inside modal
  const renderIOSPicker = () => (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={style.overlay}>
        <View style={style.modalContainer}>
          <Text style={style.modalTitle}>{title}</Text>

          {mode === "datetime" && (
            <View style={style.modeSelector}>
              <TouchableOpacity
                style={[
                  style.modeButton,
                  currentMode === "date" && style.activeMode,
                ]}
                onPress={() => setCurrentMode("date")}
              >
                <Text style={style.modeButtonText}>Date</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.modeButton,
                  currentMode === "time" && style.activeMode,
                ]}
                onPress={() => setCurrentMode("time")}
              >
                <Text style={style.modeButtonText}>Time</Text>
              </TouchableOpacity>
            </View>
          )}

          {showIosPicker && (
            <DateTimePicker
              value={selectedDate}
              mode={currentMode}
              display="spinner"
              onChange={onChange}
              style={style.datePicker}
            />
          )}

          <View style={style.buttonsContainer}>
            <TouchableOpacity
              style={[style.button, style.cancelButton]}
              onPress={onClose}
            >
              <Text style={style.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.button, style.okButton]}
              onPress={handleConfirm}
            >
              <Text style={style.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // For Android, show the native picker directly
  const renderAndroidPicker = () => {
    if (visible) {
      return (
        <DateTimePicker
          value={selectedDate}
          mode={currentMode}
          display="default"
          onChange={(event, date) => {
            if (event.type === "dismissed") {
              onClose();
            } else {
              onChange(event, date);

              if (mode === "datetime" && currentMode === "date") {
                // Continue to time selection for datetime mode
              } else {
                onConfirm(date);
                onClose();
              }
            }
          }}
        />
      );
    }
    return null;
  };

  return Platform.OS === "ios" ? renderIOSPicker() : renderAndroidPicker();
};

export default DateTimePickerModal;

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
      width: width * 0.85,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.05,
      color: theme.colors.PRIMARYBLACK,
      textAlign: "center",
      marginBottom: width * 0.04,
    },
    datePicker: {
      width: width * 0.75,
      height: width * 0.6,
    },
    modeSelector: {
      flexDirection: "row",
      marginBottom: width * 0.04,
      borderRadius: 5,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.colors.PRIMARYBLUE,
    },
    modeButton: {
      paddingVertical: width * 0.02,
      paddingHorizontal: width * 0.04,
      backgroundColor: theme.colors.PRIMARYWHITE,
      width: width * 0.3,
      alignItems: "center",
    },
    activeMode: {
      backgroundColor: theme.colors.PRIMARYBLUE,
    },
    modeButtonText: {
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.035,
      color: theme.colors.PRIMARYBLACK,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: width * 0.04,
    },
    button: {
      backgroundColor: theme.colors.PRIMARYBLUE,
      borderRadius: 5,
      paddingVertical: width * 0.02,
      paddingHorizontal: width * 0.08,
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
      backgroundColor: theme.colors.PRIMARYGRAY,
    },
    okButton: {
      backgroundColor: theme.colors.PRIMARYBLACK,
    },
  });
