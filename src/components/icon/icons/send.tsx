import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

const IconSend = ({ fill, ...props }: CustomIconProps): JSX.Element => {
  return (
    <Svg {...props}>
      <G>
        <Path d="M12 29V13l19 8-19 8Zm2-3 11.85-5L14 16v3.5l6 1.5-6 1.5V26Z" fill={fill || '#000'} />
      </G>
    </Svg>
  )
}

export default IconSend
