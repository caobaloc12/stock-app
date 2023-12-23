import React, { useState } from 'react'

import SectionTitle from './SectionTitle'

interface Props {
  description?: string
}

const MAX_LENGTH = 500

const Description = ({ description }: Props) => {
  const [collapsed, setCollapsed] = useState(true)

  const displayText = collapsed
    ? `${description?.slice(0, MAX_LENGTH)}...`
    : description

  return (
    <>
      <SectionTitle title='Description' />
      <div className='text-[12px] leading-[18px] mt-3 lg:text-base'>
        {displayText}
      </div>
      <span
        className='cursor-pointer mt-6 text-blue-400'
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? 'Read more' : 'Read less'}
      </span>
    </>
  )
}

export default React.memo(Description)
