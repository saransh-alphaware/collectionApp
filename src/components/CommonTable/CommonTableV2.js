import React, { useCallback } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native'; // Add TouchableNativeFeedback
import useTheme from '../../hooks/useTheme';
import useThemedStyles from '../../hooks/usethemestyle';
import { width } from '../../utils/Dimensions';
import ActivityLoader from '../ActivityLoader';
import EmptyMessage from '../EmptyMessage';
import { convertDate } from '../../utils/ConvertDate';

const CommonTableV2 = ({ TableStructure, TableData, loading = false, onPress = () => {}, fetchMoreData }) => {
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

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableNativeFeedback onPress={() => onPress(item)}>
        <View style={style.tableRow}>
          {TableStructure.map((column, columnIndex) => {
            const value = item[column.serverKey];
            return (
              <Text
                key={columnIndex}
                style={[
                  style.cell,
                  { width: columnWidths[column.serverKey], textAlign: column?.align || 'center' },
                ]}
              >
                {column?.type === 'date' ? convertDate(value) : value}
              </Text>
            );
          })}
        </View>
      </TouchableNativeFeedback>
    ),
    [TableData, TableStructure, columnWidths, onPress]
  );

  const keyExtractor = useCallback(
    (item) => item[TableStructure[0]?.serverKey]?.toString(),
    [TableStructure]
  );

  const ListHeaderComponent = () => (
    <View style={[style.tableRow, { backgroundColor: colors.PRIMARYBG }]}>
      {TableStructure.map((column, index) => (
        <Text
          key={index}
          style={[
            style.headerCell,
            { width: columnWidths[column.serverKey], textAlign: column?.align || 'center' },
          ]}
        >
          {column.heading}
        </Text>
      ))}
    </View>
  );

  const ListFooterComponent = () => {
    if (loading) {
      return <ActivityLoader />;
    }
    if (TableData?.length <= 0) {
      return (
        <EmptyMessage
          title={'No Accounts Found.'}
          mainContainer={{ marginTop: width * 0.05 }}
        />
      );
    }
    return null;
  };

  return (
    <FlatList
      data={TableData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    />
  );
};

const styles = (theme) =>
  StyleSheet.create({
    tableRow: {
      borderBottomWidth: 1,
      backgroundColor: theme.colors.PRIMARYWHITE,
      borderColor: theme.colors.PRIMARYGRAY,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: width * 0.015,
    },
    headerCell: {
      flex: 1,
      fontFamily: 'Roboto-Medium',
      fontSize: width * 0.032,
      color: theme.colors.PRIMARYWHITE,
    },
    cell: {
      flex: 1,
      fontFamily: 'Roboto-Medium',
      fontSize: width * 0.03,
      padding: width * 0.005,
      color: theme.colors.PRIMARYBLACK,
    },
  });

export default CommonTableV2;