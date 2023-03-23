import { HChatInput, HMessageList } from '@wezard/react-native-halo-ui'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useMockedChat } from '../providers/MockedChat'

export const ChatScreen: React.FC = () => {
  const { chatUser, users, messages, sendMessage } = useMockedChat()

  return (
    <View style={styles.container}>
      <HMessageList messages={messages} chatUserId={chatUser.id} users={users} />
      <HChatInput onSend={sendMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
