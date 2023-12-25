'use client'

import React, { useMemo, memo } from 'react'

import useChartData from '@/app/hooks/useChartData'
import PriceDetails from './PriceDetails'
import Chart from './Chart'
import { ChartDataType } from '@/app/types/common'

interface Props {
  symbol?: string
}

type PriceQuote = {
  currentPrice?: number
  priceChange?: number
  percentChange?: number
  isPriceUp?: boolean
}

const getPrices = (
  prevPrices: ChartDataType,
  curPrices: ChartDataType
): PriceQuote => {
  if (!prevPrices || !curPrices) return {}

  const { value: prevPrice } = prevPrices
  const { value: currentPrice } = curPrices

  if (!prevPrice || !currentPrice) return {}

  const priceChange = currentPrice - prevPrice
  const percentChange = (priceChange / prevPrice) * 100
  return {
    currentPrice,
    priceChange,
    percentChange,
    isPriceUp: priceChange > 0,
  }
}

const PricesAndChart = ({ symbol }: Props) => {
  const { chartData, loading } = useChartData(symbol)

  // Because the current price plan doesn't support this api
  // Therefore, I need to calculate the quote data from the chart data
  // by compared the last 2 items of the chart data
  const priceQuote = useMemo(() => {
    if (!Array.isArray(chartData)) return {}

    const last2Items = chartData.slice(-2)
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
  }, [chartData])

  return (
    <>
      <PriceDetails priceQuote={priceQuote} />
      <Chart
        loading={loading}
        chartData={chartData}
        isPriceUp={priceQuote.isPriceUp}
      />
    </>
  )
}

export default memo(PricesAndChart)
