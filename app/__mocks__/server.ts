import tickerDetailsResponse from './tickerDetails.json'
import relatedStocksResponse from './relatedStocks.json'

export const getTickerDetails = async (): Promise<any> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(tickerDetailsResponse)
    }, 500)
  })

export const getRelatedStocks = async (): Promise<any> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(relatedStocksResponse)
    }, 500)
  })
