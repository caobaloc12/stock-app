import React from 'react'
import { DEFAULT_ICON_SIZE, IconProps } from './utils'

const ArrowDown = ({ color, size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 5v14M5 12l7 7 7-7' />
    </svg>
  )
}

export default React.memo(ArrowDown)
