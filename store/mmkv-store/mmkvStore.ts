import {MMKV} from 'react-native-mmkv'

const storage = new MMKV()

/**
 * mmkv store getter
 * @param {string} key - key
 * @returns {string | null} - value
 */
export function getItem<T>(key: string): T | null {
    const value = storage.getString(key)
    return value ? (JSON.parse(value || '') as T) : null
}

/**
 * mmkv store setter
 * @param {string} key - key
 * @param {string} value - value
 */
export function setItem<T>(key: string, value: T): void {
    storage.set(key, JSON.stringify(value))
}

/**
 * mmkv store remove item
 * @param {string} key - key
 */
export function removeItem(key: string): void {
    storage.delete(key)
}

/**
 * mmkv store clear
 */
export function clearAll(): void {
    storage.clearAll()
}


/*
    ex)
        getItem(MmkvStoreKeys.USER_LOGIN)
        setItem(MmkvStoreKeys.USER_LOGIN, {})
        ...
*/
