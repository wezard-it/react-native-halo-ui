import * as React from 'react'
import type { Types } from '@wezard/halo-core'
import { mockedChat } from '../mock'

const MockedChatContext = React.createContext<{
  chatUser: Types.UserDetails
  users: Types.UserDetails[]
  messages: Types.MessageType.Any[]
  setMessages: React.Dispatch<React.SetStateAction<Types.MessageType.Any[]>>
}>({ ...mockedChat, setMessages: () => {} })

export const MockedChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = React.useState<Types.MessageType.Any[]>(mockedChat.messages)
  return (
    <MockedChatContext.Provider
      value={{
        chatUser: mockedChat.chatUser,
        users: mockedChat.users,
        messages,
        setMessages,
      }}>
      {children}
    </MockedChatContext.Provider>
  )
}

export const useMockedChat = (): {
  chatUser: Types.UserDetails
  messages: Types.MessageType.Any[]
  users: Types.UserDetails[]
  sendMessage: (text?: string, file?: string) => void
} => {
  const { chatUser, users, messages, setMessages } = React.useContext(MockedChatContext)

  const sendMessage = (text?: string, file?: string) => {
    const now = new Date().toISOString()

    if (file !== undefined && (file.match(/.m4a$/) || file.match(/.mp4$/))) {
      const newMessage: Types.MessageType.File = {
        id: `message${messages.length + 1}`,
        contentType: 'AUDIO',
        createdAt: now,
        updatedAt: now,
        createdBy: chatUser.id,
        deleted: false,
        delivered: true,
        metadata: null,
        readBy: [],
        room: 'room1',
        text: null,
        file: {
          name: `audio${messages.length + 1}`,
          mimeType: 'audio/m4a',
          uri: file,
        },
      }
      setMessages((curr) => [...curr, newMessage])
    } else if (text !== undefined) {
      setMessages((curr) => [
        ...curr,
        {
          id: `message${curr.length + 1}`,
          contentType: 'TEXT',
          createdAt: now,
          updatedAt: now,
          createdBy: chatUser.id,
          deleted: false,
          delivered: true,
          metadata: null,
          readBy: [],
          room: 'room1',
          text: text,
        },
      ])
    }
  }
  return {
    chatUser,
    messages,
    users,
    sendMessage,
  }
}
