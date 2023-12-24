import React, { useState } from 'react'

import SectionTitle from './SectionTitle'
import { ChevronDownIcon, ChevronUpIcon } from '@/app/components/Icon'

interface Props {
  description?: string
}

const Description = ({ description }: Props) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <>
      <SectionTitle title='Description' />
      {description && (
        <>
          <div
            className={`text-[12px] leading-[18px] mt-3 lg:text-base ${
              collapsed ? 'line-clamp-6' : ''
            }`}
          >
            {description}
          </div>
          <div className='flex justify-center'>
            <span
              className='cursor-pointer'
              tabIndex={0}
              role='button'
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronDownIcon color='#141111' size={24} />
              ) : (
                <ChevronUpIcon color='#141111' size={24} />
              )}
            </span>
          </div>
        </>
      )}
    </>
  )
}

export default React.memo(Description)
