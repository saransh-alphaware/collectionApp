import { StyleSheet, View, ActivityIndicator } from "react-native";
import useThemedStyles from "../hooks/usethemestyle";
import useTheme from "../hooks/useTheme";

const ActivityLoader = ({ backgroundColor, loaderColor, size = 30 }) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={[style.container, { backgroundColor }]}>
      <ActivityIndicator
        size={size}
        color={loaderColor ? loaderColor : colors.PRIMARYBG}
      />
    </View>
  );
};

export default ActivityLoader;

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.PRIMARYWHITE,
    },
  });
