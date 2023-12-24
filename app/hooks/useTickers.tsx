import { useEffect, useState } from 'react'
import polyClient from '@/app/lib/polyClient'
import { ITickersQuery } from '@polygon.io/client-js'

interface TickersResults {
  ticker: string
  name: string
  market: string
  locale: string
  primary_exchange: string
  type: string
  active: boolean
  currency_symbol?: string
  currency_name?: string
  base_currency_symbol?: string
  base_currency_name?: string
  cik?: string
  composite_figi?: string
  share_class_fig?: string
  last_updated_utc?: string
  deslisted_utc?: string
}

type AdditionalQuery = Omit<ITickersQuery, 'search'>

const useTickers = (search: string, additionalQuery?: AdditionalQuery) => {
  const [tickers, setTickers] = useState<TickersResults[] | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getTickers = async () => {
      try {
        setLoading(true)
        const { results } = await polyClient.reference.tickers({
          search,
          market: 'stocks',
          limit: 50,
          ...(additionalQuery || {}),
        })
        setTickers(results)
      } catch (error) {
        console.error('Error fetching tickers data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (search) {
      getTickers()
    }
  }, [search, additionalQuery])

  return { tickers, loading, error }
}

export default useTickers
