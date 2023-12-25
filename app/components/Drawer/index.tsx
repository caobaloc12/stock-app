'use client'

import React, { memo, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface DrawerProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

const Drawer = ({ visible, onClose, children }: DrawerProps) => {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    }
  }, [visible])

  const handleClose = () => {
    setIsClosing(true)
    document.body.style.overflow = 'unset'
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300) // same with CSS transition: (transition: transform 0.3s ease-in-out)
  }

  if (!visible && !isClosing) return null

  return ReactDOM.createPortal(
    <div
      className={`drawer ${visible ? 'open' : ''} ${
        isClosing ? 'closing' : ''
      }`}
    >
      <div className='drawer-overlay' />

      <div className='drawer-content'>
        <span
          className='w-6 h-6 flex justify-center items-center text-gray-400 font-light text-2xl leading-none absolute top-2 right-3 cursor-pointer'
          tabIndex={0}
          role='button'
          aria-label='Close'
          onClick={handleClose}
        >
          &times;
        </span>

        {children}
      </div>
    </div>,
    document.getElementById('drawer-root') as Element
  )
}

export default memo(Drawer)
