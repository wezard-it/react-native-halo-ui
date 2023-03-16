import type { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import type { StackParamList } from '../providers/Navigation'

const Card: React.FC<{ text: string; onPress: () => void }> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <Text style={styles.cardText}>{text}</Text>
      <ChevronRightIcon color={'#000000'} />
    </TouchableOpacity>
  )
}

export const HomeScreen: React.FC<StackScreenProps<StackParamList, 'Home'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card text={'Default'} onPress={() => navigation.navigate('DefaultTheme')} />
      <Card text={'Customized Theme'} onPress={() => navigation.navigate('CustomizedTheme')} />
      <Card text={'Customized Components'} onPress={() => navigation.navigate('CustomizedComponents')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
  },
})
