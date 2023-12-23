'use client'

import React, { useEffect, useRef, memo } from 'react'

import { createChart, ColorType } from 'lightweight-charts'

import useChartData from '@/app/hooks/useChartData'
import { Spinner } from '@/app/components'

interface StockChartProps {
  symbol?: string
}

// interface AggregateResult {
//   c: number // close price
//   h: number // highest price
//   l: number // lowest price
//   n: number // number of transactions in the aggregate window
//   o: number // open price
//   t: number // timestamp
//   v: number // volume
//   vw: number // volume weighted average price
// }

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const { chartData, loading, error } = useChartData(symbol)

  const chartContainerRef = useRef<any>()

  useEffect(() => {
    const colors = {
      backgroundColor: 'white',
      lineColor: '#2962FF',
      textColor: 'black',
      areaTopColor: '#2962FF',
      areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    }
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    })
    chart.timeScale().fitContent()
    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    })

    if (chartData) {
      newSeries.setData(chartData)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [chartData])

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  if (error) return <div>Error...</div>

  if (!chartData) return <div>No Data Found</div>

  return <div ref={chartContainerRef} className='w-full my-4'></div>
}

export default memo(StockChart)
