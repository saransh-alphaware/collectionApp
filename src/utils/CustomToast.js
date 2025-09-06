import { BaseToast } from "react-native-toast-message";

const CustomToast = (props) => (
  <BaseToast
    {...props}
    style={{ borderLeftColor: props?.props?.color }}
    text1NumberOfLines={0} // Allows unlimited lines
    text1Style={{ flexWrap: "wrap" }}
  />
);

export default CustomToast;
