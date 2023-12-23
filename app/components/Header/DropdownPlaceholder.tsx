import React from 'react'

const DropdownPlaceholder = () => {
  const items = Array.from({ length: 6 })

  return (
    <div
      role='status'
      className='w-full p-4 space-y-4 shadow animate-pulse md:p-6'
    >
      {items.map((_, index) => (
        <div key={index} className='flex gap-x-6 h-6 items-center py-4'>
          <div className='w-24 h-3 bg-gray-200 rounded-full flex-none'></div>
          <div className='h-3 bg-gray-200 rounded-full flex-grow'></div>
        </div>
      ))}
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default DropdownPlaceholder
