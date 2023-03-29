import * as React from 'react'
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { useHaloTheme } from '../../core/halo-provider'
import { HIcon } from '../icon/h-icon'

interface HIconButtonProps {
  iconName: IconName
  onPress: () => void
  onPressIn?: () => void
  onPressOut?: () => void
  onLongPress?: () => void
  disabled?: boolean
  backColor?: string
  backPressedColor?: string
  iconColor?: string
  style?: StyleProp<ViewStyle>
}

export const HIconButton: React.FC<HIconButtonProps> = ({
  iconName,
  style,
  disabled = false,
  backColor,
  backPressedColor,
  iconColor,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
}) => {
  const theme = useHaloTheme()
  const [pressed, setPressed] = React.useState<boolean>(false)

  const backgroundColor = React.useMemo(() => {
    if (disabled) return theme.colors.surfaces.dark
    if (pressed) return backPressedColor ?? theme.colors.primary.light
    return backColor ?? theme.colors.primary.regular
  }, [
    backColor,
    backPressedColor,
    disabled,
    pressed,
    theme.colors.primary.light,
    theme.colors.primary.regular,
    theme.colors.surfaces.dark,
  ])

  const _onPressIn = React.useCallback(() => {
    setPressed(true)
    onPressIn && onPressIn()
  }, [onPressIn])

  const _onPressOut = React.useCallback(() => {
    setPressed(false)
    onPressOut && onPressOut()
  }, [onPressOut])

  return (
    <Pressable
      onPress={onPress}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      onLongPress={onLongPress}
      disabled={disabled}
      style={[
        styles.btn,
        {
          backgroundColor,
        },
        style,
      ]}>
      <HIcon name={iconName} fill={iconColor ?? theme.colors.text.dark} />
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
