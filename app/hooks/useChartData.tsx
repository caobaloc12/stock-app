'use client'

import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import polyClient from '@/app/lib/polyClient'

type ChartDataType = {
  time: string
  value?: number
}

const useChartData = (symbol?: string) => {
  const [chartData, setChartData] = useState<ChartDataType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!symbol) throw new Error('Symbol is required')

        setLoading(true)
        const { results } = await polyClient.stocks.aggregates(
          symbol,
          1,
          'day',
          dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
          dayjs().format('YYYY-MM-DD')
        )
        if (Array.isArray(results) && results.length > 0) {
          setChartData(
            results.map((item) => ({
              time: item.t ? dayjs(item.t).format('YYYY-MM-DD') : '',
              value: item.c,
            }))
          )
        }
      } catch (error) {
        console.error('Error fetching tickers data: ', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (symbol) {
      fetchData()
    }
  }, [symbol])

  return { chartData, loading, error }
}

export default useChartData
