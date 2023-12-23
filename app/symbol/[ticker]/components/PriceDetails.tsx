import { ArrowDownIcon, ArrowUpIcon } from '@/app/components/Icon'
import useQuoteLatest from '@/app/hooks/useQuoteLatest'
import { formatPercent, formatPrice } from '@/app/utils/common'
import React from 'react'

interface PriceDetailsProps {
  tickerDetails: any
}

const PriceDetails = ({ tickerDetails }: PriceDetailsProps) => {
  const { quoteLatest } = useQuoteLatest(tickerDetails?.ticker)

  if (!quoteLatest) {
    return <div className='my-3'>--</div>
  }
  return (
    <div className='mt-3 mb-6 font-medium'>
      <div className='text-[28px] leading-[36px] text-[#1D2021]'>
        {quoteLatest?.currentPrice
          ? formatPrice(quoteLatest.currentPrice)
          : '--'}
      </div>
      <div
        className={`flex justify-start items-center gap-x-2 text-[18px] leading-6 ${
          quoteLatest?.isPriceUp ? 'text-[#58D38C]' : 'text-[#E51616]'
        }`}
      >
        <span>
          {quoteLatest?.priceChange
            ? quoteLatest.priceChange > 0
              ? `+${quoteLatest.priceChange}`
              : quoteLatest.priceChange
            : '--'}
        </span>
        <span className='flex justify-start items-center gap-x-0.5'>
          {quoteLatest?.isPriceUp ? (
            <ArrowUpIcon color='#58D38C' size={18} />
          ) : (
            <ArrowDownIcon color='#E51616' size={18} />
          )}
          <span>
            {quoteLatest?.percentChange
              ? formatPercent(quoteLatest.percentChange)
              : '--'}
          </span>
        </span>
      </div>
    </div>
  )
}

export default React.memo(PriceDetails)
