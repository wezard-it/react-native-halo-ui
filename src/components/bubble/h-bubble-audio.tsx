import moment from 'moment'
import * as React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useHaloTheme } from '../../core/halo-provider'
import { HIconButton } from '../button-icon/h-icon-button'
import type { HBubbleProps } from './h-bubble.types'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useRecorderPlayer } from '../../hooks/use-recorder-player/use-recorder-player'
import type { Types } from '@wezard/halo-core'

export const HBubbleAudio: React.FC<
  HBubbleProps & {
    bubbleStyle: StyleProp<ViewStyle>
    labelTextStyle: StyleProp<TextStyle>
    timeTextStyle: StyleProp<TextStyle>
    creatorIsChatUser: boolean
  }
> = ({ bubbleStyle, labelTextStyle, creatorIsChatUser, creator, timeTextStyle, message }) => {
  const theme = useHaloTheme()

  const player = useRecorderPlayer()

  const [dotStartingPosition, setDotStartingPosition] = React.useState<number>(0)

  const _onPlayStopPress = React.useCallback(() => {
    if (player.isPlaying) {
      player.pause()
    } else {
      player.play((message as Types.MessageType.File).file.uri)
    }
  }, [message, player])

  const playbackPositionAnimatedValue = useSharedValue(0)

  const playbackDotAnimatedStyle = useAnimatedStyle(() => {
    const left = interpolate(playbackPositionAnimatedValue.value, [0, 142], [0, 142])
    return {
      left,
    }
  })

  const playbackProgressAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(playbackPositionAnimatedValue.value, [0, 142], [8, 150])
    return {
      width,
    }
  })

  const gesture = React.useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          const position = dotStartingPosition + event.translationX
          playbackPositionAnimatedValue.value = position > 142 ? 142 : position < 0 ? 0 : position
        })
        .onEnd((event) => {
          const position = dotStartingPosition + event.translationX
          runOnJS(setDotStartingPosition)(position)
          runOnJS(player.seek)(player.duration ? (position * player.duration) / 142 : 0)
        }),
    [dotStartingPosition, playbackPositionAnimatedValue, player.duration, player.seek],
  )

  React.useEffect(() => {
    if (player.currentSecs && player.duration) {
      const position = Math.floor((player.currentSecs * 142) / player.duration)
      setDotStartingPosition(position)
      playbackPositionAnimatedValue.value = withTiming(position, { duration: 0.5 })
    } else {
      setDotStartingPosition(0)
      playbackPositionAnimatedValue.value = withTiming(0, { duration: 0.5 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.currentSecs, player.duration])

  return (
    <View style={[bubbleStyle]}>
      {!creatorIsChatUser ? (
        <Text style={labelTextStyle}>
          {creator?.firstName} {creator?.lastName}
        </Text>
      ) : null}
      {/* <Text style={messageTextStyle}>{message!.text}</Text> */}
      <View style={styles.wrapper}>
        <HIconButton
          iconName={player.isPlaying ? 'pause' : 'play'}
          onPress={_onPlayStopPress}
          backColor={theme.colors.surfaces.light}
          backPressedColor={theme.colors.surfaces.lightest}
          iconColor={theme.colors.primary.dark}
        />
        <View style={styles.progressWrapper}>
          <View
            style={[
              styles.progressBack,
              {
                backgroundColor: theme.colors.surfaces.regular,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.progress,
              {
                backgroundColor: theme.colors.primary.dark,
              },
              playbackProgressAnimatedStyle,
            ]}
          />

          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: theme.colors.primary.darkest,
                },
                playbackDotAnimatedStyle,
              ]}
            />
          </GestureDetector>
        </View>
      </View>
      <Text style={timeTextStyle}>{moment(message!.createdAt).format('HH:mm')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressWrapper: {
    marginLeft: 12,
    marginRight: 6,
  },
  progressBack: {
    width: 150,
    height: 12,
    borderRadius: 6,
  },
  progress: {
    position: 'absolute',
    height: 12,
    borderRadius: 6,
  },
  dot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    top: -2,
  },
})
