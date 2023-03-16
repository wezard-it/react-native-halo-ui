import { HBubble } from '@wezard/react-native-halo-ui'
import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import type { Types } from '@wezard/halo-core'
import { useMockedChat } from '../providers/MockedChat'

export const ChatCustomScreen: React.FC = () => {
  const { chatUser, users, messages } = useMockedChat()

  const renderBubble = React.useCallback(
    (message: Types.MessageType.Any, chatUserId: string, creator: Types.UserDetails) => {
      return (
        <View
          style={{
            backgroundColor: chatUserId === creator.id ? 'pink' : 'red',
            padding: 12,
            paddingHorizontal: 24,
            borderRadius: 100,
            maxWidth: '80%',
          }}>
          <Text>{message.text}</Text>
        </View>
      )
    },
    [],
  )

  return (
    <View style={styles.container}>
      <ScrollView>
        <HBubble message={messages[0]!} chatUserId={chatUser.id} creator={users[0]!} renderBubble={renderBubble} />
        <HBubble message={messages[1]!} chatUserId={chatUser.id} creator={users[1]!} renderBubble={renderBubble} />
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
