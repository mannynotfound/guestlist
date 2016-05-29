/* abbreviate number adapted from
  http://stackoverflow.com/questions/2692323/code-golf-friendly-number-abbreviator */

export function abbrNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  const _decPlaces = Math.pow(10, decPlaces)
  let newNum = number

  // Enumerate number abbreviations
  const abbrev = ["k", "m", "b", "t"]

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3)
    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.

      newNum = Math.round(number * _decPlaces / size) / _decPlaces

      // Add the letter for the abbreviation
      newNum += abbrev[i]

      // We are done... stop
      break
    }
  }

  return newNum
}
