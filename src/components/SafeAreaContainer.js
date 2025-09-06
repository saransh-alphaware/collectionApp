import { Platform, StatusBar, KeyboardAvoidingView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';

function Inner({ children }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar 
        translucent={false}
        backgroundColor={colors.PRIMARYBG}
        animated 
        barStyle="light-content"
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.PRIMARYBGGRAY }}
        edges={['top']}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{
            flex: 1,
            backgroundColor: colors.PRIMARYBGGRAY,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
          }}
        >
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

function SafeAreaContainer({ children }) {
  return (
    <SafeAreaProvider>
      <Inner>{children}</Inner>
    </SafeAreaProvider>
  );
}

export default SafeAreaContainer;

