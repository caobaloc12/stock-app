'use client'

import React, { useEffect, useState, memo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import polyClient from '@/app/lib/polyClient'

// Ensure Chart.js registers the required scale globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface StockChartProps {
  symbol: string
}

interface AggregateResult {
  c: number // close price
  h: number // highest price
  l: number // lowest price
  n: number // number of transactions in the aggregate window
  o: number // open price
  t: number // timestamp
  v: number // volume
  vw: number // volume weighted average price
}

interface AggregateResponse {
  status: string
  resultsCount: number
  results: AggregateResult[]
  ticker: string
  queryCount: number
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<any>({})

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await polyClient.stocks.aggregates(
          symbol,
          1,
          'day',
          '2023-01-01',
          '2023-04-14'
        )

        // Process fetched data to format for chart display
        const { results = [] } = data
        const formattedData = {
          labels: results.map((item) => {
            if (item.t) {
              const d = new Date(item.t)
              return d.toLocaleDateString('en-US')
            }
            return 'Invalid Date'
          }),
          datasets: [
            {
              label: `${symbol} Price`,
              data: results.map((item) => item.c),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        }
        setChartData(formattedData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchChartData()
  }, [symbol])

  console.log({ chartData })

  return (
    <div>
      <h2>Stock Chart for {symbol}</h2>
      {chartData.labels?.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <div> Loading... </div>
      )}
    </div>
  )
}

export default memo(StockChart)
