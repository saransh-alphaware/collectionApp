import { isAxiosError } from "axios"
import { showError, showSuccess } from "./ToastMessage"

const successHandler = (message) => {
    showSuccess(message)
}
const errorHandler = (error) => {
    console.log(error)
    if (isAxiosError(error)) {
        return showError(error.response.data.message)
    }
}

export {
    successHandler,
    errorHandler
}