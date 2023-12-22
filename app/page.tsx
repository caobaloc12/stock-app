import React from 'react'

import { StockChart } from '@/app/components'

const HomePage = () => {
  return (
    <div className='w-full my-8 h-screen max-w-7xl mx-auto'>
      HomePage
      <StockChart symbol='TSLA' />
    </div>
  )
}

export default HomePage
