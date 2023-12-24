import React from 'react'

import { IconProps, DEFAULT_ICON_SIZE } from './utils'

const ChevronUp = ({ color, size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      fill={color}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M17.657 15.657a1 1 0 0 1-.707-.293L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l5.657-5.657a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-.707 1.707z' />
    </svg>
  )
}

export default React.memo(ChevronUp)
