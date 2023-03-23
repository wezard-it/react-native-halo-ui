import * as React from 'react'
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { useHaloTheme } from '../../core/halo-provider'
import { HIcon } from '../icon/h-icon'

interface HIconButtonProps {
  iconName: IconName
  onPress: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

export const HIconButton: React.FC<HIconButtonProps> = ({ iconName, onPress, style, disabled = false }) => {
  const theme = useHaloTheme()
  const [pressed, setPressed] = React.useState<boolean>(false)

  const backgroundColor = React.useMemo(() => {
    if (disabled) return theme.colors.surfaces.dark
    return pressed ? theme.colors.terziary : theme.colors.secondary
  }, [disabled, pressed, theme.colors.secondary, theme.colors.surfaces.dark, theme.colors.terziary])

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      style={[
        styles.btn,
        {
          backgroundColor,
        },
        style,
      ]}>
      <HIcon name={iconName} fill={theme.colors.text.dark} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
})
