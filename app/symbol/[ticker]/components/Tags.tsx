import React from 'react'

import SectionTitle from './SectionTitle'

interface Props {
  tags: string[]
}

const Tags = ({ tags }: Props) => {
  return (
    <section>
      <SectionTitle title='Tags' />
      <div className='mt-[18px]'>Lorem, ipsum.</div>
    </section>
  )
}

export default React.memo(Tags)
