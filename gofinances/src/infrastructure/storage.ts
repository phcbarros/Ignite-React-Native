import AsyncStorage from '@react-native-async-storage/async-storage'

function save<TObj>(data: TObj, key: string) {
  return AsyncStorage.setItem(key, JSON.stringify(data))
}

async function get<TObj>(key: string, defaultValue: unknown = []) {
  const data = await AsyncStorage.getItem(key)
  return (data ? JSON.parse(data) : defaultValue) as TObj
}

async function deleteAll<TObj>(key: string) {
  const data = await AsyncStorage.removeItem(key)
}

export const Storage = {save, get, deleteAll}
