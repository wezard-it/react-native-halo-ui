import * as React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { PartialDeep } from 'type-fest'
import _ from 'lodash'

type HaloTheme = {
  colors: {
    primary: string
    secondary: string
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
}

const defaultLightTheme: HaloTheme = {
  colors: {
    primary: '#783EF7',
    secondary: '#AB8AF3',
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
}

const HaloContext = React.createContext<{ theme: HaloTheme }>({ theme: defaultLightTheme })

interface HaloProviderProps {
  theme?: PartialDeep<HaloTheme>
}

export const HaloProvider: React.FC<HaloProviderProps> = ({ children, theme }) => {
  const mergedTheme: HaloTheme = _.merge(defaultLightTheme, theme)

  return <HaloContext.Provider value={{ theme: mergedTheme }}>{children}</HaloContext.Provider>
}

export const useHaloTheme = (): HaloTheme => {
  const { theme } = React.useContext(HaloContext)
  return theme
}
