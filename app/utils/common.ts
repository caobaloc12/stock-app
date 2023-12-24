export const formatNumber = (number: number) => {
  return number.toFixed(2)
}

/**
 * Formats the given price as a currency string in USD.
 *
 * @param price - The price to format.
 * @returns The formatted price as a currency string.
 */
export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

/**
 * Formats a percentage value with a sign and two decimal places.
 * @param percent - The percentage value to format.
 * @returns The formatted percentage string.
 */
export const formatPercent = (percent: number) => {
  return `${percent.toFixed(2)}%`
}

export const formatPhoneNumber = (phone: string) => {
  if (!phone) return 'N/A'

  // US format
  const cleaned = ('' + phone).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }

  return 'N/A'
}

// format number with commas in thousands
export const formatNumberWithCommas = (number: number) => {
  return number.toLocaleString('en-US')
}
