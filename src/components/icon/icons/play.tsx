import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

const IconPlay = ({ fill, ...props }: CustomIconProps): JSX.Element => {
  return (
    <Svg {...props}>
      <G>
        <Path d="M17 28V14l11 7-11 7Z" fill={fill || '#000'} />
      </G>
    </Svg>
  )
}

export default IconPlay
