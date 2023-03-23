import { HMessageList } from '@wezard/react-native-halo-ui'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useMockedChat } from '../providers/MockedChat'

export const ChatScreen: React.FC = () => {
  const { chatUser, users, messages } = useMockedChat()
  return (
    <View style={styles.container}>
      <HMessageList messages={messages} chatUserId={chatUser.id} users={users} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
