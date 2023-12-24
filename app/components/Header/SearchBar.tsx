'use client'

import React, { useState, useRef, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import useDebounce from '@/app/hooks/useDebounce'
import useTickers from '@/app/hooks/useTickers'
import useClickOutside from '@/app/hooks/useClickOutside'
import { SearchIcon } from '@/app/components/Icon'
import DropdownPlaceholder from './DropdownPlaceholder'

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className='relative top-2 bg-white z-[999] min-h-16 max-h-[400px] w-full rounded-bl-sm rounded-br-sm shadow-lg overflow-y-auto'>
    {children}
  </div>
)

const SearchBar = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const debouncedValue = useDebounce(inputValue, 500)
  const { tickers, loading, error } = useTickers(debouncedValue)

  useClickOutside(ref, () => {
    setVisible(false)
  })

  useEffect(() => {
    if (tickers && tickers.length > 0) {
      setVisible(true)
    }
  }, [tickers])

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const highlightMatchedToken = (text: string, token: string) => {
    const regex = new RegExp(`(${token})`, 'gi')
    return text.replace(regex, '<strong style="color: #141111">$1</strong>')
  }

  const handleSelect = (item: any) => {
    setVisible(false)
    router.push(`/symbol/${item.ticker}`)
  }

  const renderDropdown = () => {
    if (!visible) return null

    if (loading) {
      return (
        <Wrapper>
          <div className='top-[28px]'>
            <DropdownPlaceholder />
          </div>
        </Wrapper>
      )
    }

    if (error) {
      return (
        <Wrapper>
          <div className='top-[28px] text-center px-6 py-4 text-red-400'>
            An error occurred. Please try again later.
          </div>
        </Wrapper>
      )
    }

    return (
      <>
        {Array.isArray(tickers) && tickers.length > 0 ? (
          <Wrapper>
            <ul className='pt-4 flex flex-col'>
              {tickers.map((item) => (
                <li
                  key={item.ticker}
                  onClick={() => handleSelect(item)}
                  className='text-[#141111] text-[18px] leading-[24px] cursor-pointer px-5 py-6 line-clamp-1 hover:bg-gray-50'
                  dangerouslySetInnerHTML={{
                    __html: `<div style="display:flex"><div style="flex: 0 0 60px; margin-right: 15px;">${
                      item.ticker
                    }</div><div style="flex:1; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">${highlightMatchedToken(
                      item.name,
                      debouncedValue
                    )}</div></div>`,
                  }}
                ></li>
              ))}
            </ul>
          </Wrapper>
        ) : (
          <Wrapper>
            <div className='text-center px-6 py-4 text-[#141111]'>
              No Results Found
            </div>
          </Wrapper>
        )}
      </>
    )
  }

  return (
    <div ref={ref} className='relative'>
      <span className='absolute left-2'>
        <SearchIcon color='#CECED0' size={24} />
      </span>
      <input
        type='text'
        placeholder='Search symbols or companies'
        className='w-full h-7 pl-11 pr-4 focus:outline-none'
        value={inputValue}
        onChange={handleInputChange}
      />

      {renderDropdown()}
    </div>
  )
}

export default SearchBar
