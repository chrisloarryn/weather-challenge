/**
 * returns an string with 'str...' format if the number is minor than str length
 *
 * @param {string} str
 * @param {number} num
 * @return {*}  {string}
 *
 */
export const truncateString = (str: string, num: number): string => {
  // Clear out that junk in your trunk
  if (str.length > num) return `${str.slice(0, num)}...`
  else return str
}

/**
 * uppercase first letter in a word
 *
 * @param {string} word
 * @return {*}  {string}
 *
 */
export const ucWords = (word: string): string => {
  if (!word) return word

  return `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`
}

/**
 * Uppercase each word of a text
 *
 * @param {string} text
 * @return {*}  {string}
 *
 */
export const eachWord = (text: string): string => {
  if (!text) return ''

  // Removes the leading and trailing white space and line terminator characters from a string
  let propText = text.trim()

  // if (propText.includes('-')) propText = propText.split('-').join(' ');
  if (propText.includes('_')) propText = propText.split('_').join(' ')

  // If has not second name return text
  if (!propText.includes(' ')) return ucWords(text)

  // Make an array with all words
  const words = propText.split(' ')

  // Return each word in required format
  return words
    .filter((word: string) => word.length > 0)
    .map(
      (word: string) =>
        word[0] && word[0].toUpperCase() + word.substring(1).toLowerCase(),
    )
    .join(' ')
}