'use client'

import React, { Suspense, lazy, memo, useEffect, useState } from 'react'

const LazyMap = lazy(() => import('@/app/components/Map'))

interface Props {
  address: string
  width?: string | number
  height?: string | number
}

const LazyLoadedMap = ({ address, width, height }: Props) => {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GMAP_API_KEY!
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.onload = () => setMapLoaded(true)
    document.head.appendChild(script)
  }, [])

  return (
    <Suspense
      fallback={
        <div className='w-full h-[200px] xl:max-w-[600px] xl:h-[300px]'>
          Loading...
        </div>
      }
    >
      {mapLoaded && <LazyMap address={address} width={width} height={height} />}
    </Suspense>
  )
}

export default memo(LazyLoadedMap)
