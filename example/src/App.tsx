import * as React from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationProvider } from './providers/Navigation'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationProvider />
    </SafeAreaProvider>
  )
}
