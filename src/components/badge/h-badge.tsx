import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useHaloTheme } from '../../core/halo-provider'

interface HBadgeProps {
  title: string
  renderDateBadge?: (title: string) => React.ReactNode
}

export const HBadge: React.FC<HBadgeProps> = ({ title, renderDateBadge: renderBadge }) => {
  const theme = useHaloTheme()
  return (
    <View style={styles.back}>
      {renderBadge ? (
        renderBadge(title)
      ) : (
        <View style={[theme.badge.container]}>
          <Text style={[theme.badge.text]}>{title}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
})
