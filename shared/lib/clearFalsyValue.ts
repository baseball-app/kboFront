export function clearFalsyValue(params: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null && value !== '' && value !== undefined),
  );
}
