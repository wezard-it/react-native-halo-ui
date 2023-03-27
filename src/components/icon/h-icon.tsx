import * as React from 'react'

import { IconAttach, IconDelete, IconMicOff, IconMicOn, IconSend } from './icons'

const rendered =
  (Component: any) =>
  (props: CustomIconProps): JSX.Element =>
    <Component {...props} />

const iconMaps = {
  attach: { render: rendered(IconAttach) },
  delete: { render: rendered(IconDelete) },
  micOff: { render: rendered(IconMicOff) },
  micOn: { render: rendered(IconMicOn) },
  send: { render: rendered(IconSend) },
}

export const HIcon = ({ fill, name, size }: IconProps): JSX.Element => {
  return iconMaps[name].render({ fill, size })
}
