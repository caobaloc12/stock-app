import { useEffect, useState } from 'react'

import { ITickerDetails } from '@polygon.io/client-js'

import polyClient from '@/app/lib/polyClient'
import { USE_MOCK } from '@/app/utils/constants'
import * as mockApi from '@/app/__mocks__/server'

type TickerDetailsResult = ITickerDetails['results']

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
        results && setTickerDetails(results)
      } catch (error) {
        console.error('Error fetching tickers data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (symbol) {
      console.log('get ticker details: ', symbol)
      getTickerDetails()
    }
  }, [symbol])

  return { tickerDetails, loading, error }
}

export default useTickerDetails
