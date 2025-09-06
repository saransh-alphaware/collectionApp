import { Modal, View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const GlobalBlurLoader = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.translucentBackground} />
          <ActivityIndicator size="large" color="blue" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  translucentBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // mimic blur
  },
});

export default GlobalBlurLoader;
