import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

const IconAttach = ({ fill, ...props }: CustomIconProps): JSX.Element => {
  return (
    <Svg {...props}>
      <G>
        <Path
          d="M20.5 31c-1.533 0-2.833-.533-3.9-1.6-1.067-1.067-1.6-2.367-1.6-3.9V15c0-1.1.392-2.042 1.175-2.825C16.958 11.392 17.9 11 19 11s2.042.392 2.825 1.175C22.608 12.958 23 13.9 23 15v9.5c0 .7-.242 1.292-.725 1.775-.483.483-1.075.725-1.775.725s-1.292-.242-1.775-.725C18.242 25.792 18 25.2 18 24.5V15h1.5v9.5c0 .283.096.52.288.712.191.192.429.288.712.288s.52-.096.712-.288a.968.968 0 0 0 .288-.712V15c0-.7-.242-1.292-.725-1.775-.483-.483-1.075-.725-1.775-.725s-1.292.242-1.775.725c-.483.483-.725 1.075-.725 1.775v10.5c0 1.1.392 2.042 1.175 2.825.783.783 1.725 1.175 2.825 1.175s2.042-.392 2.825-1.175c.783-.783 1.175-1.725 1.175-2.825V15H26v10.5c0 1.533-.533 2.833-1.6 3.9-1.067 1.067-2.367 1.6-3.9 1.6Z"
          fill={fill || '#000'}
        />
      </G>
    </Svg>
  )
}

export default IconAttach
