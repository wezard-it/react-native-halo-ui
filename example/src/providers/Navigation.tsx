import * as React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { HomeScreen } from '../screens/Home'
import { NavigationContainer, ParamListBase, useNavigation as useReactNavigation } from '@react-navigation/native'
import { ChatScreen } from '../screens/Chat'
import { HaloProvider } from '@wezard/react-native-halo-ui'
import { theme1 } from '../themes'
import { ChatCustomScreen } from '../screens/ChatCustom'
import { MockedChatProvider } from './MockedChat'

const Stack = createStackNavigator<StackParamList>()
const ChatDefatulStack = createStackNavigator<ChatStackParamList>()
const ChatCustomizedThemeStack = createStackNavigator<ChatStackParamList>()
const ChatCustomizedComponentsStack = createStackNavigator<ChatStackParamList>()

export type StackParamList = {
  Home: undefined
  DefaultTheme: undefined
  CustomizedTheme: undefined
  CustomizedComponents: undefined
}

export type ChatStackParamList = {
  Chat: undefined
}

export const DefaultThemeChatNavigator = () => {
  return (
    <MockedChatProvider>
      <HaloProvider>
        <ChatDefatulStack.Navigator initialRouteName={'Chat'}>
          <ChatDefatulStack.Screen name={'Chat'} component={ChatScreen} />
        </ChatDefatulStack.Navigator>
      </HaloProvider>
    </MockedChatProvider>
  )
}

export const CustomizedThemeChatNavigator = () => {
  return (
    <MockedChatProvider>
      <HaloProvider theme={theme1}>
        <ChatCustomizedThemeStack.Navigator initialRouteName={'Chat'}>
          <ChatCustomizedThemeStack.Screen name={'Chat'} component={ChatScreen} />
        </ChatCustomizedThemeStack.Navigator>
      </HaloProvider>
    </MockedChatProvider>
  )
}

export const CustomizedComponentsChatNavigator = () => {
  return (
    <MockedChatProvider>
      <HaloProvider>
        <ChatCustomizedComponentsStack.Navigator initialRouteName={'Chat'}>
          <ChatCustomizedComponentsStack.Screen name={'Chat'} component={ChatCustomScreen} />
        </ChatCustomizedComponentsStack.Navigator>
      </HaloProvider>
    </MockedChatProvider>
  )
}

export const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Home'} component={HomeScreen} options={{ headerShown: true }} />
        <Stack.Screen name={'DefaultTheme'} component={DefaultThemeChatNavigator} />
        <Stack.Screen name={'CustomizedTheme'} component={CustomizedThemeChatNavigator} />
        <Stack.Screen name={'CustomizedComponents'} component={CustomizedComponentsChatNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const useNavigation = <T extends ParamListBase>() => {
  return useReactNavigation<StackNavigationProp<T>>()
}
