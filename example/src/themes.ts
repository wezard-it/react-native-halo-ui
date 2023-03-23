import type { HaloTheme } from '@wezard/react-native-halo-ui'

export const theme1: Partial<HaloTheme> = {
  colors: {
    primary: '#208B3A',
    secondary: '#92E6A7',
    surfaces: {
      darkest: '#20A6A6',
      dark: '#20BFBF',
      regular: '#20D6D6',
      light: '#20F2F2',
      lightest: '#20FFFF',
    },
  },
  bubble: {
    base: {
      text: {
        color: '#1E1A26',
      },
      label: {
        color: '#1E1A26',
        fontWeight: '700',
        fontSize: 14,
      },
      time: {
        color: '#1E1A26',
        fontWeight: '300',
        fontSize: 10,
      },
      container: {},
    },
    left: {
      container: {
        backgroundColor: '#B7EFC5',
        borderTopLeftRadius: 0,
      },
      label: {},
      text: {},
      time: {},
    },
    right: {
      container: {
        backgroundColor: '#2DC653',
        borderTopRightRadius: 0,
      },
      label: {},
      text: {},
      time: {},
    },
  },
  badge: {
    container: {
      backgroundColor: '#20D6D6',
    },
    text: {},
  },
}
