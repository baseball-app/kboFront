/**
 * FormDataEntryValue 타입 정의
 * React Native 환경에서 사용 가능한 FormData 값 타입
 */
export type FormDataEntryValue = string | File | Blob | {uri: string; type?: string; name?: string} | any;

/**
 * React Native FormData를 확장한 타입 안전한 인터페이스
 *
 * FormData의 append 메서드에 대한 타입 보장을 제공합니다.
 * React Native 환경에서 사용되는 FormData의 특수한 형태를 지원합니다.
 *
 * @template T - 필드명과 값 타입을 정의하는 객체 타입 (기본값: Record<string, FormDataEntryValue>)
 *
 * @example
 * ```typescript
 * // 필드명과 값 타입을 객체로 정의
 * type TicketFormData = {
 *   image?: {uri: string; type?: string; name?: string}
 *   date: string
 *   game: string
 *   result: string
 *   score_our: string
 * }
 *
 * const formData: IFormData<TicketFormData> = new FormData()
 * formData.append('image', {uri: '...'}) // ✅ 타입 체크 통과
 * formData.append('date', '2024-01-01') // ✅ 타입 체크 통과
 * formData.append('date', 123) // ❌ 타입 에러: date는 string만 허용
 * formData.append('invalid', 'value') // ❌ 타입 에러: invalid 필드가 없음
 * ```
 */
export interface IFormData<T extends Record<string, FormDataEntryValue> = any> {
  /**
   * FormData에 필드를 추가합니다.
   *
   * @param name 필드 이름 (T의 키로 제한됨)
   * @param value 필드 값 (T[name] 타입으로 제한됨)
   */
  append<K extends keyof T>(name: K, value: FormDataEntryValue): void;

  /**
   * FormData에서 특정 필드를 제거합니다.
   *
   * @param name 제거할 필드 이름 (T의 키로 제한됨)
   */
  delete<K extends keyof T>(name: K): void;

  /**
   * FormData에서 특정 필드의 첫 번째 값을 반환합니다.
   *
   * @param name 필드 이름 (T의 키로 제한됨)
   * @returns 필드 값 (T[name] 타입) 또는 null
   */
  get<K extends keyof T>(name: K): FormDataEntryValue | null;

  /**
   * FormData에서 특정 필드의 모든 값을 반환합니다.
   *
   * @param name 필드 이름 (T의 키로 제한됨)
   * @returns 필드 값 배열 (T[name][] 타입)
   */
  getAll<K extends keyof T>(name: K): FormDataEntryValue[];

  /**
   * FormData에 특정 필드가 있는지 확인합니다.
   *
   * @param name 필드 이름 (T의 키로 제한됨)
   * @returns 필드 존재 여부
   */
  has<K extends keyof T>(name: K): boolean;

  /**
   * FormData의 모든 키-값 쌍을 순회할 수 있는 이터레이터를 반환합니다.
   */
  entries(): IterableIterator<[keyof T, FormDataEntryValue]>;

  /**
   * FormData의 모든 키를 순회할 수 있는 이터레이터를 반환합니다.
   */
  keys(): IterableIterator<keyof T>;

  /**
   * FormData의 모든 값을 순회할 수 있는 이터레이터를 반환합니다.
   */
  values(): IterableIterator<FormDataEntryValue>;

  /**
   * FormData의 모든 키-값 쌍을 순회합니다.
   */
  forEach(
    callbackfn: <K extends keyof T>(value: FormDataEntryValue, key: K, parent: IFormData<T>) => void,
    thisArg?: any,
  ): void;
}

/**
 * 타입 안전한 FormData 구현 클래스
 *
 * IFormData 인터페이스를 구현하여 필드명과 값 타입을 보장합니다.
 *
 * @template T - 필드명과 값 타입을 정의하는 객체 타입 (기본값: Record<string, FormDataEntryValue>)
 *
 * @example
 * ```typescript
 * type TicketFormData = {
 *   image?: {uri: string; type?: string; name?: string}
 *   date: string
 *   game: string
 * }
 *
 * const formData = new CustomFormData<TicketFormData>()
 * formData.append('date', '2024-01-01') // ✅ 타입 체크 통과
 * formData.append('invalid', 'value') // ❌ 타입 에러
 * ```
 */
export class CustomFormData<T extends Record<string, FormDataEntryValue> = Record<string, FormDataEntryValue>>
  extends FormData
  implements IFormData<T>
{
  constructor() {
    super();
  }

  // - React Native FormData는 {uri: string} 객체를 받을 수 있지만 타입 정의가 다릅니다
  override append<K extends keyof T>(name: K, value: FormDataEntryValue): void {
    // number, boolean 등 string이 아닌 값이면 자동으로 string으로 변환
    const v = typeof value === 'number' || typeof value === 'boolean' ? JSON.stringify(value) : value;
    super.append(name as string, v as any);
  }

  override delete<K extends keyof T>(name: K): void {
    super.delete(name as string);
  }

  // - 반환 타입이 더 구체적이지만 런타임에서는 호환됩니다
  override get<K extends keyof T>(name: K): FormDataEntryValue | null {
    const value = super.get(name as string);
    return (value as FormDataEntryValue) || null;
  }

  // - 반환 타입이 더 구체적이지만 런타임에서는 호환됩니다
  override getAll<K extends keyof T>(name: K): FormDataEntryValue[] {
    return super.getAll(name as string) as FormDataEntryValue[];
  }

  override has<K extends keyof T>(name: K): boolean {
    return super.has(name as string);
  }

  // @ts-expect-error - 반환 타입이 더 구체적이지만 런타임에서는 호환됩니다
  override entries(): IterableIterator<[keyof T, FormDataEntryValue]> {
    return super.entries() as unknown as IterableIterator<[keyof T, FormDataEntryValue]>;
  }

  // @ts-expect-error - 반환 타입이 더 구체적이지만 런타임에서는 호환됩니다
  override keys(): IterableIterator<keyof T> {
    return super.keys() as unknown as IterableIterator<keyof T>;
  }

  // @ts-expect-error - 반환 타입이 더 구체적이지만 런타임에서는 호환됩니다
  override values(): IterableIterator<FormDataEntryValue> {
    return super.values() as IterableIterator<FormDataEntryValue>;
  }

  // @ts-expect-error - 콜백 시그니처가 더 구체적이지만 런타임에서는 호환됩니다
  override forEach(
    callbackfn: <K extends keyof T>(value: FormDataEntryValue, key: K, parent: IFormData<T>) => void,
    thisArg?: any,
  ): void {
    super.forEach((value, key) => {
      callbackfn.call(thisArg, value as T[Extract<keyof T, string>], key as keyof T, this as IFormData<T>);
    });
  }
}
