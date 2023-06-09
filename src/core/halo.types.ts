import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type HaloColorScheme = {
  darkest: string
  dark: string
  regular: string
  light: string
  lightest: string
}
export type HaloTheme = {
  colors: {
    primary: HaloColorScheme
    surfaces: HaloColorScheme
    text: HaloColorScheme
  }
  bubble: {
    base: {
      text: StyleProp<TextStyle>
      container: StyleProp<ViewStyle>
      label: StyleProp<TextStyle>
      time: StyleProp<TextStyle>
    }
    left: {
      text: StyleProp<TextStyle>
      container: StyleProp<ViewStyle>
      label: StyleProp<TextStyle>
      time: StyleProp<TextStyle>
    }
    right: {
      text: StyleProp<TextStyle>
      container: StyleProp<ViewStyle>
      label: StyleProp<TextStyle>
      time: StyleProp<TextStyle>
    }
  }
  badge: {
    text: StyleProp<TextStyle>
    container: StyleProp<ViewStyle>
  }
  input: {
    container: StyleProp<ViewStyle>
    back: StyleProp<ViewStyle>
    text: StyleProp<TextStyle>
  }
}
