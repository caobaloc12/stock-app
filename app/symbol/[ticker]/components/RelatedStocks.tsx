import React from 'react'

import SectionTitle from './SectionTitle'
import Tag from './Tag'
import { useRouter } from 'next/navigation'

interface Props {
  relatedStocks: any[]
}

const RelatedStocks = ({ relatedStocks }: Props) => {
  const router = useRouter()
  return (
    <>
      <SectionTitle title='Related Stocks' />
      {Array.isArray(relatedStocks) && relatedStocks.length > 0 && (
        <div className='flex justify-start gap-2 flex-wrap mt-4'>
          {relatedStocks.map((stock) => (
            <Tag
              key={stock?.ticker}
              tag={stock?.ticker}
              color={stock?.priceChange > 0 ? '#58D38C' : '#E83E3E'}
              onClick={() => {
                router.push(`/symbol/${stock?.ticker}`)
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default React.memo(RelatedStocks)
