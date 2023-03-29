import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useHaloTheme } from '../../core/halo-provider'
import type { HBubbleProps } from './h-bubble.types'
import { HBubbleText } from './h-bubble-text'
import { HBubbleAudio } from './h-bubble-audio'

export const HBubble: React.FC<HBubbleProps> = ({ message, chatUserId, creator, renderBubble }) => {
  const theme = useHaloTheme()

  const creatorIsChatUser = React.useMemo(() => {
    return chatUserId === creator?.id
  }, [chatUserId, creator?.id])

  const bubbleStyle = React.useMemo(
    () => [
      styles.bubble,
      theme.bubble.base.container,
      creatorIsChatUser ? theme.bubble.right.container : theme.bubble.left.container,
    ],
    [creatorIsChatUser, theme.bubble.base.container, theme.bubble.left.container, theme.bubble.right.container],
  )

  const labelTextStyle = React.useMemo(
    () => [
      creatorIsChatUser ? styles.textAlignRight : styles.textAlignLeft,
      theme.bubble.base.label,
      creatorIsChatUser ? theme.bubble.right.label : theme.bubble.left.label,
    ],
    [creatorIsChatUser, theme.bubble.base.label, theme.bubble.left.label, theme.bubble.right.label],
  )

  const timeTextStyle = React.useMemo(
    () => [
      styles.time,
      creatorIsChatUser ? styles.textAlignRight : styles.textAlignLeft,
      theme.bubble.base.time,
      creatorIsChatUser ? theme.bubble.right.time : theme.bubble.left.time,
    ],
    [creatorIsChatUser, theme.bubble.base.time, theme.bubble.left.time, theme.bubble.right.time],
  )

  const messageTextStyle = React.useMemo(
    () => [
      creatorIsChatUser ? styles.textAlignRight : styles.textAlignLeft,
      theme.bubble.base.text,
      creatorIsChatUser ? theme.bubble.right.text : theme.bubble.left.text,
    ],
    [creatorIsChatUser, theme.bubble.base.text, theme.bubble.left.text, theme.bubble.right.text],
  )

  const _renderAvatar = React.useCallback(() => {
    return creator!.image ? (
      <Image source={{ uri: creator!.image }} style={styles.avatar} />
    ) : (
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarPlaceholderText}>
          {creator!.firstName![0]}
          {creator!.lastName![0]}
        </Text>
      </View>
    )
  }, [creator])

  const _renderBubble = React.useCallback(() => {
    switch (message!.contentType) {
      case 'TEXT':
        return (
          <HBubbleText
            bubbleStyle={bubbleStyle}
            labelTextStyle={labelTextStyle}
            messageTextStyle={messageTextStyle}
            timeTextStyle={timeTextStyle}
            creatorIsChatUser={creatorIsChatUser}
            message={message}
            chatUserId={chatUserId}
            creator={creator}
          />
        )
      case 'AUDIO':
        return (
          <HBubbleAudio
            bubbleStyle={bubbleStyle}
            labelTextStyle={labelTextStyle}
            timeTextStyle={timeTextStyle}
            creatorIsChatUser={creatorIsChatUser}
            message={message}
            chatUserId={chatUserId}
            creator={creator}
          />
        )
      default:
        return null
    }
  }, [bubbleStyle, chatUserId, creator, creatorIsChatUser, labelTextStyle, message, messageTextStyle, timeTextStyle])

  return (
    <View style={[styles.wrapper, creatorIsChatUser ? styles.alignRight : styles.alignLeft]}>
      {renderBubble ? (
        renderBubble(message, chatUserId, creator)
      ) : (
        <>
          {!creatorIsChatUser ? _renderAvatar() : null}
          {_renderBubble()}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  alignLeft: {
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  bubble: {
    maxWidth: '75%',
  },
  time: {
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#AFA8BF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
})
