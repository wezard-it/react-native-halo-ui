import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import type { Types } from '@wezard/halo-core'
import { useHaloTheme } from '../../core/provider'
import moment from 'moment'

type HBubbleProps = Partial<{
  chatUserId: string
  creator: Types.UserDetails
  message: Types.MessageType.Any
}>

export const HBubble: React.FC<HBubbleProps> = ({ message, chatUserId, creator }) => {
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

  const renderAvatar = React.useCallback(() => {
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

  const renderBubble = React.useCallback(() => {
    return (
      <View style={bubbleStyle}>
        <Text style={labelTextStyle}>
          {creator?.firstName} {creator?.lastName}
        </Text>
        <Text style={messageTextStyle}>{message!.text}</Text>
        <Text style={timeTextStyle}>{moment(message!.createdAt).format('HH:mm')}</Text>
      </View>
    )
  }, [bubbleStyle, creator?.firstName, creator?.lastName, labelTextStyle, message, messageTextStyle, timeTextStyle])

  return (
    <View style={[styles.wrapper, creatorIsChatUser ? styles.alignRight : styles.alignLeft]}>
      <>
        {!creatorIsChatUser ? renderAvatar() : null}
        {renderBubble()}
      </>
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
