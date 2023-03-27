import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

const IconAttach = ({ fill, ...props }: CustomIconProps): JSX.Element => {
  return (
    <Svg {...props}>
      <G>
        <Path
          d="M21 23a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 18 20v-6c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 21 11c.833 0 1.542.292 2.125.875S24 13.167 24 14v6c0 .833-.292 1.542-.875 2.125A2.893 2.893 0 0 1 21 23Zm-1 7v-3.075c-1.733-.233-3.167-1.008-4.3-2.325-1.133-1.317-1.7-2.85-1.7-4.6h2c0 1.383.488 2.563 1.462 3.538C18.438 24.512 19.617 25 21 25s2.563-.488 3.538-1.462C25.512 22.562 26 21.383 26 20h2c0 1.75-.567 3.283-1.7 4.6-1.133 1.317-2.567 2.092-4.3 2.325V30h-2Zm1-9c.283 0 .52-.096.712-.288A.968.968 0 0 0 22 20v-6a.968.968 0 0 0-.288-.713A.968.968 0 0 0 21 13a.968.968 0 0 0-.712.287A.968.968 0 0 0 20 14v6c0 .283.096.52.288.712.191.192.429.288.712.288Z"
          fill={fill || '#000'}
        />
      </G>
    </Svg>
  )
}

export default IconAttach
