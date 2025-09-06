import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import useThemedStyles from '../hooks/usethemestyle';
import useTheme from '../hooks/useTheme';
import { SvgIcons } from '../components/SvgIcons';
import { width } from './Dimensions';

const DropDown = ({ options, onSelect, selected, label, mainContainer }) => {
    const { colors } = useTheme()
    const style = useThemedStyles(styles)

    const [showOptions, setShowOptions] = useState(false);

    const handlePress = () => {
        setShowOptions(!showOptions);
    };

    const handleOptionSelect = (item) => {
        onSelect(item);
        setShowOptions(false);
    };

    return (
        <View style={[style.container, mainContainer]}>
            <TouchableOpacity activeOpacity={0.7} onPress={handlePress} style={style.dropdownButton}>
                <Text style={style.labeltext}>{selected.label || label}</Text>
                <SvgIcons name={showOptions ? 'up' : 'down'} size={width * .05} color={colors.PRIMARYWHITE} />
            </TouchableOpacity>
            {showOptions && (
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => handleOptionSelect(item)} style={[style.option, { backgroundColor: selected.label === item.label ? colors.PRIMARYBTN : colors.PRIMARYBG }]}>
                            <Text style={style.optiontext}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />)}
        </View>
    );
};

const styles = theme => StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1,
        padding: 1
    },
    dropdownButton: {
        flexDirection: 'row',
        padding: width * .02,
        borderWidth: 1,
        borderColor: theme.colors.PRIMARYBG,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: theme.colors.PRIMARYBG
    },
    option: {
        padding: width * .02,
        backgroundColor: theme.colors.PRIMARYBG,
    },
    labeltext: {
        fontSize: width * .034,
        fontFamily: 'Roboto-Medium',
        color: theme.colors.PRIMARYBG,
        marginRight: width * .03
    },
    optiontext: {
        fontSize: width * .034,
        fontFamily: 'Roboto-Medium',
        color: theme.colors.PRIMARYWHITE,
    }
});

export default DropDown;
