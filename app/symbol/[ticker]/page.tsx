import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

import { ITickerDetails, ITickers } from '@polygon.io/client-js'
import {
  getHeaders,
  polyAPIUrl,
  stringifyQueryParams,
} from '@/app/utils/common'
import PricesAndChart from './components/PricesAndChart'

import About from './components/About'
import Description from './components/Description'
import Tags from './components/Tags'
import RelatedStocks from './components/RelatedStocks'

interface PageProps {
  params: {
    ticker: string
  }
}

const NOT_FOUND = 'NOT_FOUND'

const mockTags = ['automotive', 'consumer_discretionary']

// use first sentence of ticker's description as meta description
const getShortDescription = (description?: string): string | null =>
  description ? `${description.split('. ')[0]}.` : null

export async function generateMetadata(
  { params: { ticker } }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await fetch(`${polyAPIUrl}/v3/reference/tickers/${ticker}`, {
    headers: getHeaders(),
  })
  const data: ITickerDetails = await res.json()
  if (data.status === NOT_FOUND) {
    return {
      title: 'Ticker not found',
    }
  }

  let _description = getShortDescription(data.results?.description)
  // fallback to parent description
  if (!_description) {
    _description = (await parent).description
  }
  return {
    title: `${data.results?.ticker} ${data.results?.name} | Stock App`,
    description:
      getShortDescription(data.results?.description) ||
      (await parent).description,
  }
}

async function getTickerDetails(symbol: string): Promise<ITickerDetails> {
  const res = await fetch(`${polyAPIUrl}/v3/reference/tickers/${symbol}`, {
    headers: getHeaders(),
  })
  return res.json()
}

async function getRelatedStocks(tickerType: string): Promise<ITickers> {
  const queryString = stringifyQueryParams({
    type: tickerType,
    market: 'stocks',
    active: true,
    sort: 'ticker',
    limit: 5,
  })
  const res = await fetch(`${polyAPIUrl}/v3/reference/tickers?${queryString}`, {
    headers: getHeaders(),
  })

  return res.json()
}

async function Page({ params }: PageProps) {
  const { results: tickerDetails } = await getTickerDetails(params.ticker)
  let relatedStocks: ITickers['results'] = []
  if (tickerDetails?.type) {
    const { results } = await getRelatedStocks(tickerDetails.type)
    relatedStocks = results.filter(({ ticker }) => ticker !== params.ticker)
  }

  if (!tickerDetails) {
    return (
      <div className='px-8 pt-8'>
        <div className='text-lg'>Ticker not found.</div>
      </div>
    )
  }

  return (
    <div className='px-8 pt-8 pb-20'>
      <h1 className='font-medium text-[22px] leading-none'>
        {tickerDetails.ticker}
        <span className='font-normal text-[18px] leading-[22px] ml-3'>
          {tickerDetails?.name}
        </span>
      </h1>

      <div className='flex flex-col gap-y-10'>
        <PricesAndChart symbol={tickerDetails.ticker} />
        <About tickerDetails={tickerDetails} />
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-4 lg:grid-flow-col'>
          <section className='mb-10'>
            <Description description={tickerDetails?.description} />
          </section>
          <div className='flex flex-col gap-y-10'>
            <section className='lg:order-2'>
              {/* TODO: use tags data from ticker details */}
              <Tags tags={mockTags} />
            </section>
            <section className='lg:order-1'>
              <RelatedStocks relatedStocks={relatedStocks} />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
