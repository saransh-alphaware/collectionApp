import Toast from 'react-native-toast-message'

const showSuccess = (success) => {
    Toast.show({
        type: 'success',
        text1: success,
        autoHide: true,
        visibilityTime: 2000,
        props:{color: "green"}
    });
}

const showError = (error) => {
    Toast.show({
        type: 'error',
        text1: error,
        autoHide: true,
        visibilityTime: 2000,
        props:{color: "red"}
    });
}

const showInfo = (info) => {
    Toast.show({
        type: 'info',
        text1: info,
        autoHide: true,
        visibilityTime: 2000,
        props:{color: "yellow"}
    });
}

export { showSuccess, showError, showInfo }