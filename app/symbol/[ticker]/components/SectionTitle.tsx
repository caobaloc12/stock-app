import { memo } from 'react'

const SectionTitle = ({
  title,
  className = '',
}: {
  title: string
  className?: string
}) => {
  return (
    <h2
      className={`font-medium text-[16px] leading-[20px] lg:text-[18px] ${className}`}
    >
      {title}
    </h2>
  )
}

export default memo(SectionTitle)
