import React from 'react'

import { DEFAULT_ICON_SIZE, IconProps } from './utils'

const SearchIcon = ({ color, size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 18C13.3137 18 16 15.3137 16 12C16 8.68629 13.3137 6 10 6C6.68629 6 4 8.68629 4 12C4 15.3137 6.68629 18 10 18Z'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21 21L15 15'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default SearchIcon
