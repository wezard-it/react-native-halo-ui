type IconName = 'attach' | 'delete' | 'micOff' | 'micOn' | 'pause' | 'play' | 'send'

interface IconProps {
  fill?: string
  size?: string
  name: IconName
}

interface CustomIconProps extends SvgProps {
  fill?: string
  size?: string
}
