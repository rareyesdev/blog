type Option = string | { [key: string]: boolean } | null | undefined | Option[]

/**
 * An utility for joining CSS classes together.
 * @param options CSS classes that will be joined (maybe conditionally).
 * @returns An array of CSS classes.
 */
export function joinClasses(...options: Option[]) {
  const classes = [] as string[]

  for (let i = 0; i < options.length; ++i) {
    const option = options[i]
    if (!option) continue

    if (typeof option === 'string') {
      classes.push(option)
    } else if (Array.isArray(option)) {
      const strClasses = joinClasses(...option)
      if (strClasses) classes.push(strClasses)
    } else if (typeof option === 'object') {
      if (option.toString !== Object.prototype.toString) {
        classes.push(option.toString())
      } else {
        for (const key in option) {
          if (Object.prototype.hasOwnProperty.call(option, key) && option[key]) {
            classes.push(key)
          }
        }
      }
    }
  }

  return classes.join(' ')
}
