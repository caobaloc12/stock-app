'use client'

import React from 'react'

import { SECTOR_COLOR_MAP, SECTOR_LABEL_MAP } from '@/app/utils/constants'
import SectionTitle from './SectionTitle'
import Tag from './Tag'

interface Props {
  tags: string[]
}

type TagColor = keyof typeof SECTOR_COLOR_MAP

const Tags = ({ tags }: Props) => {
  return (
    <>
      <SectionTitle title='Tags' />
      <div className='flex justify-start items-center gap-2 flex-wrap mt-4'>
        {tags.map((tag) => (
          <Tag
            key={tag}
            tag={SECTOR_LABEL_MAP[tag as TagColor]}
            color={SECTOR_COLOR_MAP[tag as TagColor]}
            onClick={() => {
              // TODO: handle tag click
              console.log('tag clicked: ', tag)
            }}
          />
        ))}
      </div>
    </>
  )
}

export default React.memo(Tags)
