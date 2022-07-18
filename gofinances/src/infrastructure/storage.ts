import AsyncStorage from '@react-native-async-storage/async-storage'

const DATA_KEY = '@gofinances:transactions'

function save<TObj>(data: TObj, key: string = DATA_KEY) {
  return AsyncStorage.setItem(key, JSON.stringify(data))
}

async function get<TObj>() {
  const data = await AsyncStorage.getItem(DATA_KEY)
  return (data ? JSON.parse(data) : []) as TObj
}

async function deleteAll<TObj>() {
  const data = await AsyncStorage.removeItem(DATA_KEY)
}

export const Storage = {save, get, deleteAll}
