import type { HaloTheme } from 'src/core/provider'

export const theme1: HaloTheme = {
  colors: {
    primary: '#208B3A',
    secondary: '#92E6A7',
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
}
