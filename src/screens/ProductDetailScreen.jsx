import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SafeAreaContainer from '../components/SafeAreaContainer';
import AppHeader from '../components/AppHeader';
import { width } from '../utils/Dimensions';
import useThemedStyles from '../hooks/usethemestyle';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';
import TextInput from '../components/FormInput';
import DropDown from '../utils/DropDown';

const userAccount = [{ value: 'John Test', label: '85252857878585' }];

const ProductDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  const [amount, setAmount] = useState({ amount: 0, totalAmount: 0 });
  const [value, setValue] = useState('');

  const { productId, productName, balance } = route.params.product;

  return (
    <SafeAreaContainer>
      <AppHeader isLeft title={'Product Details'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.Container}>
          {/* product details */}
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                style.txt,
                { color: colors.PRIMARYGRAY, marginRight: width * 0.015 },
              ]}
            >
              Product Name :
            </Text>
            <Text style={style.txt}>{productName}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                style.txt,
                { color: colors.PRIMARYGRAY, marginRight: width * 0.015 },
              ]}
            >
              Product Id :
            </Text>
            <Text style={style.txt}>{productId}</Text>
          </View>

          <View
            style={{
              marginVertical: width * 0.03,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                style.txt,
                { color: colors.PRIMARYGRAY, marginRight: width * 0.015 },
              ]}
            >
              Customer A/c No. :
            </Text>
            <View style={style.accountContainer}>
              <Text style={style.txt}>7661264516452646</Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: width * 0.03,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                style.txt,
                { color: colors.PRIMARYGRAY, marginRight: width * 0.015 },
              ]}
            >
              A/c No. :
            </Text>
            <DropDown
              options={userAccount}
              onSelect={setValue}
              selected={value}
              label={'Select A/c'}
              mainContainer={{ width: width * 0.56 }}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                style.txt,
                { color: colors.PRIMARYGRAY, marginRight: width * 0.015 },
              ]}
            >
              Amount :
            </Text>
            <TextInput
              inputstyle={{
                width: width * 0.74,
                paddingHorizontal: width * 0.02,
              }}
              type={'numeric'}
              placeholderText={'0'}
              labelValue={amount.amount}
              onChangeText={val =>
                setAmount(prevAmount => ({ ...prevAmount, amount: val }))
              }
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                style.txt,
                { color: colors.PRIMARYGRAY, marginRight: width * 0.015 },
              ]}
            >
              Confirm Amount :
            </Text>
            <TextInput
              inputstyle={{
                width: width * 0.58,
                paddingHorizontal: width * 0.02,
              }}
              type={'numeric'}
              placeholderText={'0'}
              labelValue={amount.totalAmount}
              onChangeText={val =>
                setAmount(prevAmount => ({ ...prevAmount, totalAmount: val }))
              }
            />
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={() => {}}
        title={'Save'}
        btncontainer={{
          marginHorizontal: width * 0.05,
          width: 'auto',
          marginVertical: width * 0.03,
        }}
      />
    </SafeAreaContainer>
  );
};

export default ProductDetailScreen;

const styles = theme =>
  StyleSheet.create({
    Container: {
      flex: 1,
      padding: width * 0.04,
    },
    txt: {
      fontSize: width * 0.04,
      fontFamily: 'Roboto-Medium',
      color: theme.colors.PRIMARYBLACK,
    },
    accountContainer: {
      flex: 1,
      padding: width * 0.03,
      borderWidth: width * 0.0035,
      borderRadius: width * 0.02,
      borderColor: theme.colors.PRIMARYGRAY,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: width * 0.01,
      backgroundColor: theme.colors.PRIMARYWHITE,
    },
  });
