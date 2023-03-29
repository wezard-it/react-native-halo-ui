import type { Types } from '@wezard/halo-core'

type HBubbleProps = {
  chatUserId: string
  creator: Types.UserDetails
  message: Types.MessageType.Any
  renderBubble?: (message: Types.MessageType.Any, chatUserId: string, creator: Types.UserDetails) => React.ReactNode
}
