import tickerDetailsResponse from './tickerDetails.json'

export const getTickerDetails = async (): Promise<any> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(tickerDetailsResponse)
    }, 500)
  })
