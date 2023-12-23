'use client'

import React, { useEffect, useRef, memo } from 'react'

import { createChart, ColorType } from 'lightweight-charts'

import { Spinner } from '@/app/components'

interface StockChartProps {
  symbol?: string
  chartState?: any
}

const StockChart: React.FC<StockChartProps> = ({ chartState, symbol }) => {
  const { chartData, loading } = chartState || {}

  const chartContainerRef = useRef<any>()

  useEffect(() => {
    const colors = {
      backgroundColor: 'white',
      lineColor: '#2962FF',
      textColor: 'black',
      areaTopColor: 'rgba(41, 98, 255, 0.58)',
      areaBottomColor: 'rgba(41, 98, 255, 0.04)',
    }
    const handleResize = () => {
      chartContainerRef?.current &&
        chart.applyOptions({
          width: chartContainerRef.current?.clientWidth,
        })
    }

    const chart = createChart(chartContainerRef?.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef?.current?.clientWidth,
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

  const renderContent = () => {
    if (loading) {
      return (
        <div className='flex justify-center items-center'>
          <Spinner />
        </div>
      )
    }
    return <React.Fragment />
  }

  return (
    <div ref={chartContainerRef} className='w-full min-h-[200px]'>
      {renderContent()}
    </div>
  )
}

export default memo(StockChart)
