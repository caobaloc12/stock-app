import React from 'react'

import { MenuIcon } from '@/app/components/Icon'
import SearchBar from './SearchBar'

const AppHeader = () => {
  return (
    <div className='h-[60px] w-full flex border-b border-b-[#E9ECF4]'>
      <div className='h-[60px] w-[60px] flex-none border-r border-r-[#E9ECF4] pt-3 pr-2 pl-3 pb-[6px] lg:hidden'>
        <div className='pt-2 cursor-pointer'>
          <MenuIcon color='#CECED0' size={32} />
        </div>
      </div>
      <div className='w-full flex-grow pt-6 pb-3'>
        <SearchBar />
      </div>
    </div>
  )
}

export default AppHeader
