'use client'

import React from 'react'
import GoogleMapReact from 'google-map-react'

interface MapProps {
  address: string
  width?: string | number
  height?: string | number
}

const Map = ({ address, width, height }: MapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GMAP_API_KEY!

  // initialize map
  const renderMap = (map: any, maps: any) => {
    if (!map || !maps) return

    const geocoder = new maps.Geocoder()
    geocoder.geocode({ address }, (results: any[], status: any) => {
      if (status === maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location
        new maps.Marker({
          position: location,
          map,
          title: address,
        })
        map.setCenter(location)
      } else {
        console.error('Error in geocoding: ', status)
      }
    })
  }

  return (
    <div className='rounded-md' style={{ height, width }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={10}
        onGoogleApiLoaded={({ map, maps }) => renderMap(map, maps)}
      />
    </div>
  )
}

export default React.memo(Map)
