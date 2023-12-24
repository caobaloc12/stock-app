import React from 'react'

import { IconProps, DEFAULT_ICON_SIZE } from './utils'

const ChevronDown = ({ color, size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      fill={color}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 16a1 1 0 0 1-.707-.293L5.636 10.05A1 1 0 0 1 7.05 8.636l4.95 4.95 4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657A1 1 0 0 1 12 16z' />
    </svg>
  )
}

export default React.memo(ChevronDown)
