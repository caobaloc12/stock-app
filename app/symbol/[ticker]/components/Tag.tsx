import React from 'react'

type TagProps = {
  tag: string
  color: string
  onClick?: () => void
  href?: string
}

const Tag: React.FC<TagProps> = ({ tag, color, onClick, href }) => {
  const tagStyles: React.CSSProperties = {
    backgroundColor: color,
  }
  const baseClassname =
    'text-white text-[16px] leading-[20px] rounded-[4px] h-[30px] px-[18px] py-[5px]'

  if (href) {
    return (
      <a href={href} className={baseClassname} style={tagStyles}>
        {tag}
      </a>
    )
  }

  return (
    <div
      className={baseClassname}
      onClick={() => onClick && onClick()}
      style={tagStyles}
    >
      {tag}
    </div>
  )
}

export default React.memo(Tag)
