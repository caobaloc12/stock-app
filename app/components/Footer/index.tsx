import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='h-16 flex items-center px-6 mt-auto text-sm text-gray-400 border-t border-gray-200'>
      <p>&copy; {currentYear} Stock App</p>
    </footer>
  )
}
