import moment from 'moment'
import * as React from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import type { HBubbleProps } from './h-bubble.types'

export const HBubbleText: React.FC<
  HBubbleProps & {
    bubbleStyle: StyleProp<ViewStyle>
    labelTextStyle: StyleProp<TextStyle>
    messageTextStyle: StyleProp<TextStyle>
    timeTextStyle: StyleProp<TextStyle>
    creatorIsChatUser: boolean
  }
> = ({ bubbleStyle, labelTextStyle, creatorIsChatUser, creator, messageTextStyle, timeTextStyle, message }) => {
  return (
    <View style={bubbleStyle}>
      {!creatorIsChatUser ? (
        <Text style={labelTextStyle}>
          {creator?.firstName} {creator?.lastName}
        </Text>
      ) : null}
      <Text style={messageTextStyle}>{message!.text}</Text>
      <Text style={timeTextStyle}>{moment(message!.createdAt).format('HH:mm')}</Text>
    </View>
  )
}
