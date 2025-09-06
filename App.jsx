import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import ThemeProvider from './src/context/ThemeContext';
import AuthProvider from './src/context/AuthContext';
import Routes from './src/routes';
import Toast from 'react-native-toast-message';
import CustomToast from './src/utils/CustomToast';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes />
        <Toast
          position="top"
          config={{
            success: props => <CustomToast {...props} type="success" />,
            error: props => <CustomToast {...props} type="error" />,
            info: props => <CustomToast {...props} type="info" />,
          }}
        />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
