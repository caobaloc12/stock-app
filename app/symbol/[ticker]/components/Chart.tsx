'use client'

import React, { useEffect, useRef, memo } from 'react'

import { createChart, ColorType } from 'lightweight-charts'

import { Spinner } from '@/app/components'

interface StockChartProps {
  symbol?: string
  chartState?: any
  isPriceUp?: boolean
}

const StockChart: React.FC<StockChartProps> = ({ chartState, isPriceUp }) => {
  const { chartData, loading } = chartState || {}

  const chartContainerRef = useRef<any>()

  useEffect(() => {
    const colors = {
      backgroundColor: 'white',
      lineColor: isPriceUp ? '#58D38C' : '#E51616',
      textColor: '#141111',
      areaTopColor: isPriceUp
        ? 'rgba(88, 211, 140, 0.36)'
        : 'rgba(229, 22, 22, 0.36)',
      areaBottomColor: isPriceUp
        ? 'rgba(88, 211, 140, 0.01)'
        : 'rgba(229, 22, 22, 0.01)',
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
      handleScale: false,
      handleScroll: false,
      grid: {
        vertLines: {
          visible: false,
        },
      },
      timeScale: {
        borderColor: '#CECED0',
      },
      rightPriceScale: {
        borderVisible: false,
      },
    })
    chart.timeScale().fitContent()
    const newSeries = chart.addAreaSeries({
      lineWidth: 2,
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
  }, [chartData, isPriceUp])

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
    <div
      ref={chartContainerRef}
      className='w-full min-h-[200px] xl:max-w-[1366px]'
    >
      {renderContent()}
    </div>
  )
}

export default memo(StockChart)
