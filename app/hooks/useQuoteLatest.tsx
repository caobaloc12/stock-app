import { useState, useEffect, use } from 'react'

import polyClient from '@/app/lib/polyClient'
import dayjs from 'dayjs'

const getPrices = (prevPrices: any, curPrices: any) => {
  if (!prevPrices || !curPrices) return {}

  const prevPrice = prevPrices?.c
  const currentPrice = curPrices?.c
  const priceChange = currentPrice - prevPrice
  const percentChange = (priceChange / prevPrice) * 100
  return {
    currentPrice,
    priceChange,
    percentChange,
    isPriceUp: priceChange > 0,
  }
}

type QuoteLatestType = {
  currentPrice?: number
  priceChange?: number
  percentChange?: number
  isPriceUp?: boolean
}

const useQuoteLatest = (symbol: string) => {
  const [quoteLatest, setQuoteLatest] = useState<QuoteLatestType | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getPreviousClose = async () => {
      try {
        setLoading(true)
        const { results: aggResults } = await polyClient.stocks.aggregates(
          symbol,
          1,
          'day',
          dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
          dayjs().format('YYYY-MM-DD')
        )
        const { results: prevCloseResults } =
          await polyClient.stocks.previousClose(symbol)

        const lastResult = Array.isArray(aggResults)
          ? aggResults[aggResults.length - 1]
          : null
        const latestResult = Array.isArray(prevCloseResults)
          ? prevCloseResults[0]
          : null

        const { currentPrice, priceChange, percentChange, isPriceUp } =
          getPrices(lastResult, latestResult)
        setQuoteLatest({
          currentPrice,
          priceChange,
          percentChange,
          isPriceUp,
        })
      } catch (error) {
        console.error('Error fetching quote latest data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getPreviousClose()
  }, [symbol])

  useEffect(() => {
    const getQuoteLatest = async () => {
      try {
        setLoading(true)
        const { results } = await polyClient.stocks.lastQuote(symbol)
        console.log('getQuoteLatest', { results })
        // setQuoteLatest(results)
      } catch (error) {
        console.error('Error fetching quote latest data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    // getQuoteLatest()
  }, [symbol])

  return { quoteLatest, loading, error }
}

export default useQuoteLatest
