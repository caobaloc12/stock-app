'use client'

import React from 'react'

import useTickerDetails from '@/app/hooks/useTickerDetails'

import PriceDetails from './components/PriceDetails'
import Chart from './components/Chart'
import About from './components/About'
import Description from './components/Description'
import Tags from './components/Tags'
import RelatedStocks from './components/RelatedStocks'
import { Spinner } from '@/app/components'
import useQuoteLatest from '@/app/hooks/useQuoteLatest'

interface SymbolDetailPageProps {
  params: {
    ticker: string
  }
}

const SymbolDetailPage = ({ params }: SymbolDetailPageProps) => {
  const { ticker: symbol } = params
  const { tickerDetails, loading, error } = useTickerDetails(symbol)
  const quoteData = useQuoteLatest(symbol)

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  if (error) return <div>Error...</div>

  console.log({ tickerDetails })

  return (
    <div className='px-[30px] py-[26px]'>
      <h1 className='font-medium text-[22px] leading-none'>
        {symbol}
        <span className='font-normal text-[18px] leading-[22px] ml-3'>
          {tickerDetails?.name}
        </span>
      </h1>
      <div className='flex flex-col gap-y-10'>
        <PriceDetails tickerDetails={tickerDetails} />
        <Chart symbol={tickerDetails?.ticker} />
        <About tickerDetails={tickerDetails} />
        <Description description={tickerDetails?.description} />
        <Tags tags={[]} />
        <RelatedStocks tickers={[]} />
      </div>
    </div>
  )
}

export default SymbolDetailPage
