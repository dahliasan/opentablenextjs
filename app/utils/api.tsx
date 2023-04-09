function snakeToCamelCase(str: string): string {
  return str
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
    })
    .join('')
}

export function objectKeysSnakeToCamelCase(obj: any): {} {
  return Object.keys(obj).reduce(
    (
      result: {
        [key: string]: any
      },
      key
    ) => {
      const camelKey = snakeToCamelCase(key)
      result[camelKey] = obj[key]
      return result
    },
    {}
  )
}
