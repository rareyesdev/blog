export function stableStringify(obj: Record<string, unknown>) {
  const allKeys: string[] = []
  JSON.stringify(obj, (key, value) => {
    allKeys.push(key)
    return value
  })
  allKeys.sort()
  return JSON.stringify(obj, allKeys)
}
