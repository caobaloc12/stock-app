'use client'

import React from 'react'

import { ITickers } from '@polygon.io/client-js'
import SectionTitle from './SectionTitle'
import Tag from './Tag'

interface Props {
  relatedStocks: ITickers['results']
}

const RelatedStocks = ({ relatedStocks }: Props) => {
  return (
    <>
      <SectionTitle title='Related Stocks' />
      {Array.isArray(relatedStocks) && relatedStocks.length > 0 && (
        <div className='flex justify-start gap-2 flex-wrap mt-4'>
          {relatedStocks.map(({ ticker }) => (
            <Tag
              key={ticker}
              tag={ticker}
              color='#58D38C'
              href={`/symbol/${ticker}`}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default React.memo(RelatedStocks)
