import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import useThemedStyles from "../../hooks/usethemestyle";
import { width } from "../../utils/Dimensions";
import ActivityLoader from "../ActivityLoader";
import EmptyMessage from "../EmptyMessage";
import { convertDate } from "../../utils/ConvertDate";

const CommonTable = ({
  TableStructure,
  TableData,
  loading = false,
  onPress = () => {},
  NoDataMessage = "No Accounts Found."
}) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  const calculateColumnWidths = () => {
    const widths = {};
    TableStructure.forEach((column) => {
      const { serverKey, heading } = column;
      const headingLength = heading ? heading.length * width * 0.02 : 0;
      let dataWidth = Math.max(
        ...TableData.map((item) =>
          item[serverKey] ? item[serverKey].toString().length * width * 0.02 : 0
        ),
        width * 0.2
      );
      const columnWidth = Math.max(headingLength, dataWidth);
      widths[serverKey] = columnWidth;
    });

    return widths;
  };

  const columnWidths = calculateColumnWidths();

  if (TableData?.length <= 0 && !loading) {
    return (
      <EmptyMessage
        title={NoDataMessage}
        mainContainer={{ marginTop: width * 0.05 }}
      />
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      style={{ flex: 1 }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={style.tableContainer}>
          {/* Table Header */}
          <View style={[style.tableRow, { backgroundColor: colors.PRIMARYBG }]}>
            {TableStructure.map((column, index) => (
              <Text
                key={index}
                style={[
                  style.headerCell,
                  { width: columnWidths[column.serverKey], textAlign: column?.align || "center" },
                ]}
              >
                {column.heading}
              </Text>
            ))}
          </View>
          {loading ? (
            <ActivityLoader />
          ) : (
            <>
              {/* Table Data Rows */}
              {TableData.map((tableData, index) => (
                <TouchableNativeFeedback
                  key={tableData[TableStructure?.[0]?.serverKey] + index}
                  onPress={() => onPress(tableData)}
                >
                  <View style={style.tableRow}>
                    {TableStructure.map((column, columnIndex) => {
                      const value = tableData[column.serverKey];
                      return (
                        <Text
                          key={columnIndex}
                          style={[
                            style.cell,
                            { width: columnWidths[column.serverKey], textAlign: column?.align || "center"},
                          ]}
                        >
                          {column?.type === "date" ? convertDate(value): value}
                        </Text>
                      );
                    })}
                  </View>
                </TouchableNativeFeedback>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default CommonTable;

const styles = (theme) =>
  StyleSheet.create({
    tableContainer: {
      backgroundColor: theme.colors.PRIMARYWHITE,
      flex: 1,
      minWidth:width,
    },
    tableRow: {
      borderBottomWidth: 1,
      backgroundColor: theme.colors.PRIMARYWHITE,
      borderColor: theme.colors.PRIMARYGRAY,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: width * 0.015,
    },
    headerCell: {
      flex: 1,
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.032,
      // textAlign: "center",
      color: theme.colors.PRIMARYWHITE,
    },
    cell: {
      flex: 1,
      fontFamily: "Roboto-Medium",
      fontSize: width * 0.03,
      padding: width * 0.005,
      // textAlign: "center",
      color: theme.colors.PRIMARYBLACK,
    },
  });
