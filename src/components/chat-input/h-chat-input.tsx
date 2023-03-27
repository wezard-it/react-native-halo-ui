import * as React from 'react'
import { ActionSheetIOS } from 'react-native'
import { Platform } from 'react-native'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useHaloTheme } from '../../core/halo-provider'
import { HIconButton } from '../button-icon/h-icon-button'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Text } from 'react-native'
import Lottie from 'lottie-react-native'

interface HChatInputProps extends TextInputProps {
  onSend: (message: string) => void
  onAttachPress?: () => void
  attachOptions?: string[]
  onAttachOptionPress?: (index: number) => void
  enableRecording?: boolean
}

export const HChatInput: React.FC<HChatInputProps> = React.forwardRef<TextInput, HChatInputProps>(
  ({ onSend, onAttachPress, attachOptions, onAttachOptionPress, enableRecording, ...props }, ref) => {
    const theme = useHaloTheme()
    const [messageText, setMessageText] = React.useState<string>()
    const [isRecording, setIsRecording] = React.useState<boolean>(false)
    const [isDraggingMic, setIsDraggingMic] = React.useState<boolean>(false)
    const [lockAnimationProgress, setLockAnimationProgress] = React.useState<number>(0.5)

    const showSendButtonAnimatedValue = useSharedValue(0)
    const dragMicButtonAnimatedValue = useSharedValue(0)
    const showRecordingViewAnimatedValue = useSharedValue(0)

    const micButtonWrapperStyle = useAnimatedStyle(() => {
      const opacity = interpolate(showSendButtonAnimatedValue.value, [0, 1], [1, 0])
      const left = interpolate(showSendButtonAnimatedValue.value, [0, 1], [0, 100])
      return {
        opacity,
        left,
        top: -dragMicButtonAnimatedValue.value,
      }
    })

    const sendButtonWrapperStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        showSendButtonAnimatedValue.value || showRecordingViewAnimatedValue.value,
        [0.6, 1],
        [0, 1],
      )
      return {
        opacity,
      }
    })

    const messageInputViewAnimatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(showRecordingViewAnimatedValue.value, [0, 1], [1, 0])
      return {
        opacity,
      }
    }, [])

    const recordingViewAnimatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(showRecordingViewAnimatedValue.value, [0.6, 1], [0, 1])
      const top = interpolate(showRecordingViewAnimatedValue.value, [0.6, 1], [500, 0])
      return {
        opacity,
        top,
      }
    }, [])

    const recordingLockViewAnimatedStyle = useAnimatedStyle(() => {
      const height = interpolate(dragMicButtonAnimatedValue.value, [0, 100], [65, 42])
      return {
        height,
      }
    })

    const rightSectionAnimatedStyle = useAnimatedStyle(() => {
      const width = interpolate(showSendButtonAnimatedValue.value, [0, 1], [0, 40])
      const marginLeft = interpolate(showRecordingViewAnimatedValue.value, [0, 1], [0, 8])
      return {
        width: enableRecording ? 40 : width,
        marginLeft: enableRecording ? 8 : marginLeft,
      }
    })

    React.useEffect(() => {
      showSendButtonAnimatedValue.value = withTiming(messageText === undefined || messageText.length === 0 ? 0 : 1, {
        duration: 200,
      })
    }, [messageText, showSendButtonAnimatedValue])

    React.useEffect(() => {
      showRecordingViewAnimatedValue.value = withTiming(isRecording ? 1 : 0, { duration: 300 })
    }, [isRecording, showRecordingViewAnimatedValue])

    const _onAttach = React.useCallback(() => {
      if (onAttachPress) onAttachPress()
      else if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: attachOptions || ['Cancel', 'Photo', 'File'],
            cancelButtonIndex: 0,
          },
          onAttachOptionPress
            ? onAttachOptionPress
            : (_buttonIndex) => {
                // todo:
              },
        )
      } else {
        // todo:
      }
    }, [attachOptions, onAttachOptionPress, onAttachPress])

    const _onSend = React.useCallback(() => {
      if (isRecording) {
        setIsRecording(false)
        // todo: handle send
      } else {
        onSend(messageText!.trim())
        setMessageText(undefined)
      }
    }, [isRecording, messageText, onSend])

    const _onMicPress = React.useCallback(() => {}, [])

    const _onMicLongPress = React.useCallback(() => {
      setIsRecording(true)
    }, [])

    const _onMicPressOut = React.useCallback(() => {
      if (isRecording && !isDraggingMic) {
        setIsRecording(false)
        // todo: handle send
      }
    }, [isDraggingMic, isRecording])

    const _onDeleteRecording = React.useCallback(() => {
      setIsRecording(false)
    }, [])
    const resetMicButtonPosition = React.useCallback(() => {
      'worklet'
      dragMicButtonAnimatedValue.value = 0
    }, [dragMicButtonAnimatedValue])

    const updateMicButtonPosition = React.useCallback(
      (y: number) => {
        'worklet'
        if (y > 0) {
          if (y >= 100) {
            // lock recording
            dragMicButtonAnimatedValue.value = 0
            runOnJS(setLockAnimationProgress)(0.5)
            runOnJS(setIsRecording)(true)
            runOnJS(setIsDraggingMic)(false)
          } else {
            dragMicButtonAnimatedValue.value = y
            runOnJS(setLockAnimationProgress)(0.5 + y / 200)
          }
        }
      },
      [dragMicButtonAnimatedValue],
    )

    const gesture = React.useMemo(
      () =>
        Gesture.Pan()
          .onStart(() => runOnJS(setIsDraggingMic)(true))
          .onUpdate((event) => {
            if (!isRecording) {
              updateMicButtonPosition(-event.translationY)
            }
          })
          .onEnd(() => {
            if (!isRecording) resetMicButtonPosition()
            runOnJS(setIsDraggingMic)(false)
          }),
      [isRecording, resetMicButtonPosition, updateMicButtonPosition],
    )

    return (
      <Animated.View style={[styles.container, theme.input.container]}>
        <Animated.View style={styles.leftSection}>
          <Animated.View style={[styles.textInputView, messageInputViewAnimatedStyle]}>
            <HIconButton iconName={'attach'} onPress={_onAttach} style={styles.leftButton} />
            <View style={[styles.back, theme.input.back]}>
              <TextInput
                ref={ref}
                placeholder="Write message"
                value={messageText}
                onChangeText={setMessageText}
                multiline={true}
                style={styles.input}
                {...props}
              />
            </View>
          </Animated.View>
          <Animated.View style={[styles.recordingView, recordingViewAnimatedStyle]}>
            <HIconButton iconName={'delete'} onPress={_onDeleteRecording} style={styles.leftButton} />
            <Text style={styles.recordingTime}>01:00</Text>
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.rightSection, rightSectionAnimatedStyle]}>
          <Animated.View style={[styles.sendButton, sendButtonWrapperStyle]}>
            <HIconButton
              iconName={'send'}
              onPress={_onSend}
              disabled={(messageText === undefined || messageText.trim().length === 0) && !isRecording}
            />
          </Animated.View>
          {!isRecording && enableRecording ? (
            <Animated.View style={[styles.rightButtonWrapper, micButtonWrapperStyle]}>
              <GestureDetector gesture={gesture}>
                <HIconButton
                  iconName={'micOn'}
                  onPress={_onMicPress}
                  onLongPress={_onMicLongPress}
                  onPressOut={_onMicPressOut}
                />
              </GestureDetector>
              {!isRecording && isDraggingMic ? (
                <Animated.View
                  pointerEvents={'none'}
                  style={[
                    styles.recordingLock,
                    { backgroundColor: theme.colors.primary.light },
                    recordingLockViewAnimatedStyle,
                  ]}>
                  <Lottie
                    source={require('../../assets/animations/lock.json')}
                    style={styles.lockAnimation}
                    progress={lockAnimationProgress}
                  />
                </Animated.View>
              ) : null}
            </Animated.View>
          ) : null}
        </Animated.View>
      </Animated.View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    minHeight: 42,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    maxHeight: 150,
  },
  leftButton: { marginRight: 8 },
  rightSection: {
    marginLeft: 8,
    height: 40,
    width: 40,
  },
  rightButtonWrapper: {
    position: 'absolute',
  },
  sendButton: {
    position: 'absolute',
    marginLeft: 8,
    width: 40,
  },
  leftSection: {
    flex: 1,
    minHeight: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingView: {
    position: 'absolute',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingTime: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 16,
  },
  recordingLock: {
    position: 'absolute',
    width: 42,
    height: 65,
    bottom: 65,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockAnimation: {
    width: 36,
    height: 36,
    marginBottom: 10,
  },
})
