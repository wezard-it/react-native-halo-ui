import * as React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { HomeScreen } from '../screens/Home'
import { NavigationContainer, ParamListBase, useNavigation as useReactNavigation } from '@react-navigation/native'
import { DefaultThemeScreen } from '../screens/DefaultTheme'
import { CustomizedThemeScreen } from '../screens/CustomizedTheme'
import { CustomizedComponentsScreen } from '../screens/CustomizedComponents'

const Stack = createStackNavigator<StackParamList>()

export type StackParamList = {
  Home: undefined
  DefaultTheme: undefined
  CustomizedTheme: undefined
  CustomizedComponents: undefined
}

export const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'DefaultTheme'} component={DefaultThemeScreen} />
        <Stack.Screen name={'CustomizedTheme'} component={CustomizedThemeScreen} />
        <Stack.Screen name={'CustomizedComponents'} component={CustomizedComponentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const useNavigation = <T extends ParamListBase>() => {
  return useReactNavigation<StackNavigationProp<T>>()
}
