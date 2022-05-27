export interface Type {
  type: 'positive' | 'negative'
}

export enum TransactionsType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export interface Transaction {
  id: string
  name: string | undefined
  amount: string | undefined
  type: string
  category: string
  date: Date
}
