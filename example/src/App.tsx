import * as React from 'react'

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { HaloProvider, HBubble } from '@wezard/react-native-halo-ui'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import type { Types } from '@wezard/halo-core'

const user1: Types.UserDetails = {
  id: 'user1',
  firstName: 'Giorgia',
  lastName: 'DeLonghi',
  image: 'https://i.pravatar.cc/150?img=13',
  nickname: 'giogia',
}

const user2: Types.UserDetails = {
  id: 'user2',
  firstName: 'Paolo Federico',
  lastName: 'Morelli',
  image: 'https://i.pravatar.cc/150?img=3',
  nickname: 'paul',
}

export default function App() {
  return (
    <SafeAreaProvider>
      <HaloProvider>
        <View style={styles.container}>
          <ScrollView>
            <HBubble
              message={{
                id: 'message1',
                contentType: 'TEXT',
                createdAt: '2023-03-16T09:00:00.000Z',
                updatedAt: '2023-03-16T09:00:00.000Z',
                createdBy: 'user1',
                deleted: false,
                delivered: true,
                metadata: null,
                readBy: [],
                room: 'room1',
                text: 'ciao',
              }}
              chatUserId={'user1'}
              creator={user1}
            />
            <HBubble
              message={{
                id: 'message2',
                contentType: 'TEXT',
                createdAt: '2023-03-16T09:00:00.000Z',
                updatedAt: '2023-03-16T09:00:00.000Z',
                createdBy: 'user2',
                deleted: false,
                delivered: true,
                metadata: null,
                readBy: [],
                room: 'room1',
                text: 'ciao',
              }}
              chatUserId={'user1'}
              creator={user2}
            />
          </ScrollView>
        </View>
      </HaloProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
