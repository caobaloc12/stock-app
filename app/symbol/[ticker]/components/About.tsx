import React, { useMemo, memo } from 'react'
import SectionTitle from './SectionTitle'
import { ITickerDetails } from '@polygon.io/client-js'

interface AboutProps {
  tickerDetails: ITickerDetails['results']
}

const DetailItem = memo(
  ({ label, value }: { label: string; value?: string }) => {
    return (
      <div className='flex gap-x-1'>
        <span>{label}:</span>
        <span className='font-medium'>{value}</span>
      </div>
    )
  }
)

const About = ({ tickerDetails }: AboutProps) => {
  const details = useMemo(
    () => [
      {
        label: 'Sector',
        value: tickerDetails?.type,
      },
      {
        label: 'Industry',
        value: tickerDetails?.sic_description,
      },
      {
        label: 'CEO',
        value: 'N/A', // FIXME: no "ceo" field in the Polygon ticker data
      },
      {
        label: 'Employees',
        value: tickerDetails?.total_employees?.toString(),
      },
    ],
    [tickerDetails]
  )

  const address = useMemo(() => {
    const { address1, city, postal_code, state } = tickerDetails?.address || {}

    return `${[address1, city, `${state || ''} ${postal_code || ''}`]
      .filter(Boolean)
      .join(', ')}`
  }, [tickerDetails?.address])

  const phoneNumber = useMemo(() => {
    const _phone = tickerDetails?.phone_number

    if (!_phone) return 'N/A'

    // format US phone number
    const cleaned = ('' + _phone).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }

    return 'N/A'
  }, [tickerDetails?.phone_number])

  return (
    <section>
      <SectionTitle title={`About ${tickerDetails?.ticker}`} />
      <div className='flex justify-between flex-wrap gap-2 text-[12px]'>
        <div className='flex flex-col gap-y-1 leading-[16px] mt-[14px]'>
          {details.map((item) => (
            <DetailItem
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
        <div>
          <p className='mb-3'>
            {address} <br />
            United States
          </p>
          <p>{phoneNumber}</p>
        </div>
        <div className='w-full flex items-center justify-center flex-grow max-w-[600px] h-[148px] bg-gray-100 rounded-md'>
          Google Map Placeholder
        </div>
      </div>
    </section>
  )
}

export default memo(About)
