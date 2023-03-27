import type { HaloTheme } from '@wezard/react-native-halo-ui'

export const theme1: Partial<HaloTheme> = {
  colors: {
    primary: {
      darkest: '#8E3C9E',
      dark: '#6B2BAA',
      regular: '#532D8C',
      light: '#5E4CA8',
      lightest: '#766EC6',
    },
    surfaces: {
      darkest: '#262626',
      dark: '#2F2F2F',
      regular: '#333333',
      light: '#4A4A4A',
      lightest: '#6D6D6D',
    },
    text: {
      darkest: '#FFFFFF',
      dark: '#EDEDED',
      regular: '#CCCCCC',
      light: '#999999',
      lightest: '#666666',
    },
  },
  bubble: {
    base: {
      text: {
        color: '#CCCCCC',
      },
      label: {
        color: '#EDEDED',
        fontWeight: '700',
        fontSize: 14,
      },
      time: {
        color: '#EDEDED',
        fontWeight: '300',
        fontSize: 10,
      },
      container: {},
    },
    left: {
      container: {
        backgroundColor: '#766EC6',
        borderTopLeftRadius: 0,
      },
      label: {},
      text: {},
      time: {},
    },
    right: {
      container: {
        backgroundColor: '#6B2BAA',
        borderTopRightRadius: 0,
      },
      label: {},
      text: {},
      time: {},
    },
  },
  badge: {
    container: {
      backgroundColor: '#333333',
    },
    text: {
      color: '#CCCCCC',
    },
  },
  input: {
    container: {
      backgroundColor: '#6B2BAA',
      paddingTop: 12,
      padding: 24,
    },
    back: {},
    text: {},
  },
}
