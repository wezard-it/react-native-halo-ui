import * as React from 'react'
import type { Types } from '@wezard/halo-core'
import moment from 'moment'
import { SectionList, View } from 'react-native'
import { HBubble } from '../bubble/h-bubble'
import { StyleSheet } from 'react-native'
import { HBadge } from '../badge/h-badge'
import { HMessageListBackground } from './h-message-list-background'

interface HMessageListProps {
  messages: Types.MessageType.Any[]
  chatUserId: string
  users: Types.UserDetails[]
  renderBubble?: (message: Types.MessageType.Any, chatUserId: string, creator: Types.UserDetails) => React.ReactNode
  renderDateBadge?: (title: string) => React.ReactNode
}

export const HMessageList: React.FC<HMessageListProps> = ({
  messages,
  chatUserId,
  users,
  renderBubble,
  renderDateBadge,
}) => {
  const sections: { title: string; data: Types.MessageType.Any[] }[] = React.useMemo(() => {
    const dataReduced = messages
      .sort((m1, m2) => moment(m2.createdAt).valueOf() - moment(m1.createdAt).valueOf())
      .reduce((acc: { [key: string]: Types.MessageType.Any[] }, curr: Types.MessageType.Any) => {
        const key = moment(curr.createdAt).format('YYYY-MM-DD')
        return { ...acc, [key]: [...(acc[key] ?? []), curr] }
      }, {})

    return Object.keys(dataReduced).map((key) => ({ title: key, data: dataReduced[key]! }))
  }, [messages])

  const _renderBubble = React.useCallback(
    ({ item }: { item: Types.MessageType.Any }) => {
      return (
        <HBubble
          message={item}
          chatUserId={chatUserId}
          creator={users.find((u) => u.id === item.createdBy)!}
          renderBubble={renderBubble}
        />
      )
    },
    [chatUserId, renderBubble, users],
  )

  const _renderDateBadge = React.useCallback(
    ({ section: { title: _title } }: { section: { title: string } }) => {
      const title = moment(_title).calendar({
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'DD/MM/YYYY',
      })
      return <HBadge title={title} renderDateBadge={renderDateBadge} />
    },
    [renderDateBadge],
  )

  return (
    <View style={styles.container}>
      <HMessageListBackground />
      <SectionList
        sections={sections}
        renderItem={_renderBubble}
        renderSectionFooter={_renderDateBadge}
        contentContainerStyle={styles.list}
        inverted
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
})
