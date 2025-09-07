// 객체의 key를 정렬해서 hash key를 만드는 함수
export const hashKey = (obj: any): string => {
  // replacer를 사용하여 key를 정렬
  const replacer = (_key: string, value: any) => {
    if (Array.isArray(value)) {
      return value
    } else if (value !== null && typeof value === 'object') {
      return Object.keys(value)
        .sort()
        .reduce((result: any, key: string) => {
          result[key] = value[key]
          return result
        }, {})
    }
    return value
  }

  return JSON.stringify(obj, replacer)
}
