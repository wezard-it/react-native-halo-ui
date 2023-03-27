import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

const IconDelete = ({ fill, ...props }: CustomIconProps): JSX.Element => {
  return (
    <Svg {...props}>
      <G>
        <Path
          d="M16 30c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 0 1 14 28V15h-1v-2h5v-1h6v1h5v2h-1v13c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0 1 26 30H16Zm10-15H16v13h10V15Zm-8 11h2v-9h-2v9Zm4 0h2v-9h-2v9Z"
          fill={fill || '#000'}
        />
      </G>
    </Svg>
  )
}

export default IconDelete
