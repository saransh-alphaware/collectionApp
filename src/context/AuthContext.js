import { useState, useLayoutEffect } from 'react'
import { createContext } from "react";
import { getAsyncData } from '../utils/GetAsyncData';

export const AppContext = createContext();

const AuthContext = ({ children }) => {
    const [token, setToken] = useState(null)
    const [refreshToken, setRefereshToken] = useState(null)
    const [isAuthLogin, setIsAuthLogin] = useState(false)
    const [agentId, setAgentId] = useState();
    const [agentData, setAgentData] = useState();
    const [hasWalletAccount, setHasWalletAccount] = useState(false);

    useLayoutEffect(() => {
        const getIntialValues = async () => {
            let initialState = {}
            initialState['token'] = await getAsyncData('token')
            initialState['refreshToken'] = await getAsyncData('refreshToken')
            initialState['authLogin'] = await getAsyncData('authLogin')
            initialState['agentId'] = await getAsyncData('agentId');
            setToken(initialState.token)
            setIsAuthLogin(initialState.authLogin)
            setAgentId(initialState.agentId)
            setRefereshToken(initialState.refreshToken)
        }
        getIntialValues()
    }, [])

    const values = {
        token,
        refreshToken,
        isAuthLogin,
        agentId,
        agentData,
        hasWalletAccount,
        setToken,
        setRefereshToken,
        setIsAuthLogin,
        setAgentId,
        setAgentData,
        setHasWalletAccount
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AuthContext


