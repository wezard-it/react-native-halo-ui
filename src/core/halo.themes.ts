import type { HaloTheme } from './halo.types'

export const defaultLightTheme: HaloTheme = {
  colors: {
    primary: '#783EF7',
    secondary: '#AB8AF3',
    surfaces: {
      darkest: '#A6A6A6',
      dark: '#BFBFBF',
      regular: '#D6D6D6',
      light: '#F2F2F2',
      lightest: '#FFFFFF',
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
      container: {
        padding: 8,
        borderRadius: 8,
      },
    },
    left: {
      container: {
        backgroundColor: '#E5DAFF',
        borderTopLeftRadius: 0,
      },
      label: {},
      text: {},
      time: {},
    },
    right: {
      container: {
        backgroundColor: '#AB8AF3',
        borderTopRightRadius: 0,
      },
      label: {},
      text: {},
      time: {},
    },
  },
  badge: {
    text: {
      color: '#1E1A26',
      textAlign: 'center',
    },
    container: {
      backgroundColor: '#D6D6D6',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      minWidth: 100,
      alignItems: 'center',
    },
  },
}
