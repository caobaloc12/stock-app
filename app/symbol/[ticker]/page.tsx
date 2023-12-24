'use client'

import React, { useMemo } from 'react'

import useTickerDetails from '@/app/hooks/useTickerDetails'

import PriceDetails from './components/PriceDetails'
import Chart from './components/Chart'
import About from './components/About'
import Description from './components/Description'
import Tags from './components/Tags'
import RelatedStocks from './components/RelatedStocks'
import { Spinner } from '@/app/components'
import useChartData from '@/app/hooks/useChartData'

interface SymbolDetailPageProps {
  params: {
    ticker: string
  }
}

const getPrices = (prevPrices: any, curPrices: any) => {
  if (!prevPrices || !curPrices) return {}

  const prevPrice = prevPrices?.value
  const currentPrice = curPrices?.value
  const priceChange = currentPrice - prevPrice
  const percentChange = (priceChange / prevPrice) * 100
  return {
    currentPrice,
    priceChange,
    percentChange,
    isPriceUp: priceChange > 0,
  }
}

const SymbolDetailPage = ({ params }: SymbolDetailPageProps) => {
  const { ticker: symbol } = params
  const { tickerDetails, loading, error } = useTickerDetails(symbol)
  const chartState = useChartData(symbol)

  // Because the current price plan doesn't support this api
  // Therefore, I need to calculate the quote data from the chart data
  // by compared the last 2 items of the chart data
  const priceQuote = useMemo(() => {
    if (!chartState?.chartData || !Array.isArray(chartState.chartData))
      return {}

    const last2Items = chartState.chartData.slice(-2)
    const prevItem = last2Items[0]
    const currentItem = last2Items[1]

    const { currentPrice, priceChange, percentChange, isPriceUp } = getPrices(
      prevItem,
      currentItem
    )
    return {
      currentPrice,
      priceChange,
      percentChange,
      isPriceUp,
    }
  }, [chartState?.chartData])

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  if (error)
    return (
      <div className='w-full h-screen flex justify-center items-center text-red-800'>
        An error occurred. Please try again later.
      </div>
    )

  return (
    <div className='px-[30px] pt-7 pb-20'>
      <h1 className='font-medium text-[22px] leading-none'>
        {symbol}
        <span className='font-normal text-[18px] leading-[22px] ml-3'>
          {tickerDetails?.name}
        </span>
      </h1>
      <div className='flex flex-col gap-y-10'>
        <PriceDetails priceQuote={priceQuote} />
        <Chart chartState={chartState} isPriceUp={priceQuote?.isPriceUp} />
        <About tickerDetails={tickerDetails} />
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-4 lg:grid-flow-col'>
          <section>
            <Description description={tickerDetails?.description} />
          </section>
          <div className='flex flex-col gap-y-10'>
            <section className='lg:order-2'>
              <Tags tags={['automotive', 'consumer_discretionary']} />
            </section>
            <section className='lg:order-1'>
              <RelatedStocks
                relatedStocks={tickerDetails?.related_stocks || []}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymbolDetailPage
