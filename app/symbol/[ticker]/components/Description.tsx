import React from 'react'

import SectionTitle from './SectionTitle'

interface Props {
  description?: string
}

const Description = ({ description }: Props) => {
  return (
    <section>
      <SectionTitle title='Description' />
      <div className='text-[12px] leading-[18px] mt-3'>{description}</div>
    </section>
  )
}

export default React.memo(Description)
