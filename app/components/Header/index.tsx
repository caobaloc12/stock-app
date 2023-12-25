'use client'

import React, { useState } from 'react'

import { MenuIcon } from '@/app/components/Icon'
import SearchBar from './SearchBar'
import { Drawer } from '..'
import Link from 'next/link'

const AppHeader = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className='h-[60px] w-full flex border-b border-b-[#E9ECF4]'>
        <div className='h-[60px] w-[60px] flex-none border-r border-r-[#E9ECF4] pt-3 pr-2 pl-3 pb-[6px] lg:hidden'>
          <div
            className='pt-2 cursor-pointer'
            role='button'
            tabIndex={0}
            aria-label='Menu'
            onClick={() => setVisible(true)}
          >
            <MenuIcon color='#CECED0' size={32} />
          </div>
        </div>
        <div className='w-full flex-grow pt-6 pb-3'>
          <SearchBar />
        </div>
      </div>
      <Drawer visible={visible} onClose={() => setVisible(false)}>
        <ul className='flex flex-col'>
          <li className='p-4 hover:bg-slate-50'>
            <Link href='/' className='block'>
              Home
            </Link>
          </li>
          <li className='p-4 hover:bg-slate-50'>
            <Link href='/about' className='block'>
              About
            </Link>
          </li>
        </ul>
      </Drawer>
    </>
  )
}

export default AppHeader
