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
  return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`
}
