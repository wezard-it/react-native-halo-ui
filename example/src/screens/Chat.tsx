import { HBubble } from '@wezard/react-native-halo-ui'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useMockedChat } from '../providers/MockedChat'

export const ChatScreen: React.FC = () => {
  const { chatUser, users, messages } = useMockedChat()
  return (
    <View style={styles.container}>
      <ScrollView>
        <HBubble message={messages[0]!} chatUserId={chatUser.id} creator={users[0]!} />
        <HBubble message={messages[1]!} chatUserId={chatUser.id} creator={users[1]!} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
