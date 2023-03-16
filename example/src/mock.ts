import type { Types } from '@wezard/halo-core'

export const mockedChat: {
  chatUser: Types.UserDetails
  users: Types.UserDetails[]
  messages: Types.MessageType.Any[]
} = {
  chatUser: {
    id: 'user1',
    firstName: 'Giorgia',
    lastName: 'DeLonghi',
    image: 'https://i.pravatar.cc/150?img=13',
    nickname: 'giogia',
  },
  users: [
    {
      id: 'user1',
      firstName: 'Giorgia',
      lastName: 'DeLonghi',
      image: 'https://i.pravatar.cc/150?img=13',
      nickname: 'giogia',
    },
    {
      id: 'user2',
      firstName: 'Paolo Federico',
      lastName: 'Morelli',
      image: 'https://i.pravatar.cc/150?img=3',
      nickname: 'paul',
    },
  ],
  messages: [
    {
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
    },
    {
      id: 'message2',
      contentType: 'TEXT',
      createdAt: '2023-03-16T09:12:00.000Z',
      updatedAt: '2023-03-16T09:12:00.000Z',
      createdBy: 'user2',
      deleted: false,
      delivered: true,
      metadata: null,
      readBy: [],
      room: 'room1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet hendrerit velit. Nullam sed erat quis.',
    },
  ],
}
