export interface Type {
  type: 'positive' | 'negative'
}

export enum TransactionsType {
  positive = 'positive',
  negative = 'negative',
}

export interface Transaction {
  id: string
  name: string | undefined
  amount: string | undefined
  type: string
  category: string
  date: Date
}
