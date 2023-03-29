import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

const IconPause = ({ fill, ...props }: CustomIconProps): JSX.Element => {
  return (
    <Svg {...props}>
      <G>
        <Path d="M23 28V14h4v14h-4Zm-8 0V14h4v14h-4Z" fill={fill || '#000'} />
      </G>
    </Svg>
  )
}

export default IconPause
