import React, { useMemo, memo } from 'react'
import SectionTitle from './SectionTitle'
import { ITickerDetails } from '@polygon.io/client-js'
import { formatNumberWithCommas, formatPhoneNumber } from '@/app/utils/common'
import Description from './Description'

interface AboutProps {
  tickerDetails: ITickerDetails['results']
}

interface DetailItemProps {
  label: string
  value?: string
}

const DetailItem = memo(({ label, value }: DetailItemProps) => {
  return (
    <div className='flex gap-x-1'>
      <span>{label}:</span>
      <span className='font-medium'>{value}</span>
    </div>
  )
})

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
        value: tickerDetails?.total_employees
          ? formatNumberWithCommas(tickerDetails?.total_employees)
          : '-',
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

  return (
    <section>
      <SectionTitle title={`About ${tickerDetails?.ticker}`} />
      <div className='flex justify-between flex-wrap gap-2 text-[12px] lg:text-base lg:grid lg:grid-cols-2 lg:gap-x-12'>
        <div>
          <Description description={tickerDetails?.description} />
        </div>
        <div className='flex gap-4 flex-wrap'>
          <div className='flex flex-col gap-y-1 mt-[14px] min-w-[200px] xl:min-w-[300px]'>
            {details.map((item) => (
              <DetailItem
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
          {tickerDetails?.address && (
            <div className='min-w-[200px] xl:min-w-[300px]'>
              <p className='mb-3'>
                {address} <br />
                United States
              </p>
              {tickerDetails?.phone_number && (
                <a href={`tel:${tickerDetails.phone_number}`}>
                  {formatPhoneNumber(tickerDetails.phone_number)}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(About)
