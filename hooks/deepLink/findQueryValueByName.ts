export const findQueryValueByName = (url: string, name: string): string | null => {
  if (!url) return null

  const regExp = new RegExp(`[?&]${name}=([^&]+)`)
  const match = url.match(regExp)

  // 매칭 성공 시 첫 번째 캡처 그룹 반환 (값 부분)
  return match ? decodeURIComponent(match[1]) : null
}
