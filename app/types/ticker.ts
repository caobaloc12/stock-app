export interface ITickerAddress {
  address1: string
  city: string
  state: string
  postal_code: string
}

export interface ITickerDetails {
  ticker: string
  name: string
  market: string
  locale: string
  primary_exchange: string
  type: string
  active: boolean
  currency_name: string
  cik: string
  composite_figi: string
  share_class_figi: string
  market_cap: number
  phone_number: string
  address: ITickerAddress
  description: string
  sic_code: string
  sic_description: string
  ticker_root: string
  homepage_url: string
  total_employees: number
  list_date: string
  branding: {
    logo_url: string
    icon_url: string
  }
}
