import AsyncStorage from '@react-native-async-storage/async-storage'

const DATA_KEY = '@gofinances:transactions'

function save<TObj>(data: TObj, key: string = DATA_KEY) {
  return AsyncStorage.setItem(key, JSON.stringify(data))
}

async function get<TObj>(key: string = DATA_KEY, defaultValue: unknown = []) {
  const data = await AsyncStorage.getItem(key)
  return (data ? JSON.parse(data) : defaultValue) as TObj
}

async function deleteAll<TObj>(key: string = DATA_KEY) {
  const data = await AsyncStorage.removeItem(key)
}

export const Storage = {save, get, deleteAll}
