import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeAreaContainer from '../../components/SafeAreaContainer'
import AppHeader from '../../components/AppHeader'

const HomeScreen = () => {
  return (
    <SafeAreaContainer>
      <AppHeader isLeft />
    </SafeAreaContainer>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})