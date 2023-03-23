import * as React from 'react'
import { deepMerge } from '../utils/deep-merge'
import type { PartialDeep } from 'type-fest'
import type { HaloTheme } from './halo.types'
import { defaultLightTheme } from './halo.themes'

const HaloContext = React.createContext<{ theme: HaloTheme }>({ theme: defaultLightTheme })

interface HaloProviderProps {
  theme?: PartialDeep<HaloTheme>
}

export const HaloProvider: React.FC<HaloProviderProps> = ({ children, theme }) => {
  const mergedTheme = deepMerge<HaloTheme>(theme as HaloTheme, defaultLightTheme) as HaloTheme

  return <HaloContext.Provider value={{ theme: mergedTheme }}>{children}</HaloContext.Provider>
}

export const useHaloTheme = (): HaloTheme => {
  const { theme } = React.useContext(HaloContext)
  return theme
}
