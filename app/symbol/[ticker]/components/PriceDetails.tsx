import { ArrowDownIcon, ArrowUpIcon } from '@/app/components/Icon'
import { formatNumber, formatPercent, formatPrice } from '@/app/utils/common'
import React from 'react'

interface PriceDetailsProps {
  priceQuote: any
}

const PriceDetails = ({ priceQuote }: PriceDetailsProps) => {
  if (!priceQuote) {
    return <div className='my-3'>--</div>
  }

  return (
    <div className='mt-3 font-medium'>
      <div className='text-[28px] leading-[36px] text-[#1D2021]'>
        {priceQuote?.currentPrice ? formatPrice(priceQuote.currentPrice) : '--'}
      </div>
      <div
        className={`flex justify-start items-center gap-x-2 text-[18px] leading-6 ${
          priceQuote?.priceChange
            ? priceQuote?.isPriceUp
              ? 'text-[#58D38C]'
              : 'text-[#E51616]'
            : 'text-[#141111]'
        }`}
      >
        <span>
          {priceQuote?.priceChange
            ? priceQuote.priceChange > 0
              ? `+${formatNumber(priceQuote.priceChange)}`
              : formatNumber(priceQuote.priceChange)
            : '--'}
        </span>
        {priceQuote?.percentChange && (
          <span className='flex justify-start items-center gap-x-0.5'>
            {priceQuote?.isPriceUp ? (
              <ArrowUpIcon color='#58D38C' size={18} />
            ) : (
              <ArrowDownIcon color='#E51616' size={18} />
            )}
            <span>{formatPercent(priceQuote.percentChange)}</span>
          </span>
        )}
      </div>
    </div>
  )
}

export default React.memo(PriceDetails)
