import React from 'react'

import SectionTitle from './SectionTitle'

interface Props {
  tickers: any[]
}

const RelatedStocks = ({ tickers }: Props) => {
  return (
    <>
      <SectionTitle title='Related Stocks' />
      <div className='mt-[18px]'>Lorem, ipsum.</div>
    </>
  )
}

export default React.memo(RelatedStocks)
