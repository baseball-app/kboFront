import {findQueryValueByName} from './findQueryValueByName'

describe('findQueryValueByName', () => {
  it('name이 존재하면 그 값을 반환해야 한다.', () => {
    const result = findQueryValueByName('https://naver.com?id=123&name=test', 'id')

    expect(result).toBe('123')
  })

  it('name이 존재하지 않으면 null을 반환해야 한다.', () => {
    const result = findQueryValueByName('https://naver.com?id=123&name=test', '종현짱')

    expect(result).toBeNull()
  })

  it('url이 없으면 null을 반환해야 한다.', () => {
    const result = findQueryValueByName('', 'id')

    expect(result).toBeNull()
  })
})
