import { useEffect, useState } from 'react'

import { ITickerDetails } from '@polygon.io/client-js'

import polyClient from '@/app/lib/polyClient'
import { USE_MOCK } from '@/app/utils/constants'
import * as mockApi from '@/app/__mocks__/server'

type TickerDetailsResult = ITickerDetails['results'] & {
  related_stocks?: any[]
}

const useTickerDetails = (symbol: string) => {
  const [tickerDetails, setTickerDetails] = useState<TickerDetailsResult>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getTickerDetails = async () => {
      try {
        setLoading(true)
        const { results } = USE_MOCK
          ? await mockApi.getTickerDetails()
          : await polyClient.reference.tickerDetails(symbol)
        results &&
          setTickerDetails({
            ...results,
            related_stocks: USE_MOCK
              ? (await mockApi.getRelatedStocks())?.results
              : [],
          })
      } catch (error) {
        console.error('Error fetching tickers data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (symbol) {
      getTickerDetails()
    }
  }, [symbol])

  return { tickerDetails, loading, error }
}

export default useTickerDetails
