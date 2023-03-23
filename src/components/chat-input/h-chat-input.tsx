import * as React from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { useHaloTheme } from '../../core/halo-provider'
import { HIconButton } from '../button-icon/h-icon-button'

interface HChatInputProps extends TextInputProps {
  onSend: (message: string) => void
}

export const HChatInput: React.FC<HChatInputProps> = React.forwardRef<TextInput, HChatInputProps>(
  ({ onSend, ...props }, ref) => {
    const theme = useHaloTheme()
    const [messageText, setMessageText] = React.useState<string>()

    const _onSend = React.useCallback(() => {
      onSend(messageText!.trim())
      setMessageText(undefined)
    }, [messageText, onSend])
    return (
      <View style={[styles.container, theme.input.container]}>
        <HIconButton iconName={'attach'} onPress={() => {}} style={styles.leftButton} />
        <View style={[styles.back, theme.input.back]}>
          <TextInput
            ref={ref}
            placeholder="Write message"
            value={messageText}
            onChangeText={setMessageText}
            {...props}
          />
        </View>
        <HIconButton
          iconName={'send'}
          style={styles.rightButton}
          onPress={_onSend}
          disabled={messageText === undefined || messageText.trim().length === 0}
        />
      </View>
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
  leftButton: { marginRight: 8 },
  rightButton: { marginLeft: 8 },
})
