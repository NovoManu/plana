import { openDB, DBSchema } from 'idb'
import { IProductFE, IProductAverage } from '@/modules/dashboard/services/types'

const IDB_NAME = 'plana-db'
const IDB_VERSION = 1

export enum DB_Entities {
  PRODUCTS = 'products',
  AVERAGE_QUERIES = 'queries',
}

interface PlanADB extends DBSchema {
  [DB_Entities.PRODUCTS]: {
    key: string
    value: IProductFE[]
  }
  [DB_Entities.AVERAGE_QUERIES]: {
    key: string
    value: IProductAverage[]
  }
}

const db = openDB<PlanADB>(IDB_NAME, IDB_VERSION, {
  upgrade(db) {
    db.createObjectStore(DB_Entities.PRODUCTS)
    db.createObjectStore(DB_Entities.AVERAGE_QUERIES)
  },
})

interface IDBAccess<T> {
  get(key: string): Promise<T | undefined>
  set(key: string, value: T): Promise<string>
  del(key: string): Promise<void>
  clear(): Promise<void>
}

interface IDBSchema {
  [DB_Entities.PRODUCTS]: IDBAccess<IProductFE[]>
  [DB_Entities.AVERAGE_QUERIES]: IDBAccess<IProductAverage[]>
}

const idb: IDBSchema = {
  [DB_Entities.PRODUCTS]: {
    async get(key: string): Promise<IProductFE[] | undefined> {
      return (await db).get(DB_Entities.PRODUCTS, key)
    },
    async set(key: string, value: IProductFE[]): Promise<string> {
      return (await db).put(DB_Entities.PRODUCTS, value, key)
    },
    async del(key: string): Promise<void> {
      return (await db).delete(DB_Entities.PRODUCTS, key)
    },
    async clear(): Promise<void> {
      return (await db).clear(DB_Entities.PRODUCTS)
    },
  },
  [DB_Entities.AVERAGE_QUERIES]: {
    async get(key: string): Promise<IProductAverage[] | undefined> {
      return (await db).get(DB_Entities.AVERAGE_QUERIES, key)
    },
    async set(key: string, value: IProductAverage[]): Promise<string> {
      return (await db).put(DB_Entities.AVERAGE_QUERIES, value, key)
    },
    async del(key: string): Promise<void> {
      return (await db).delete(DB_Entities.AVERAGE_QUERIES, key)
    },
    async clear(): Promise<void> {
      return (await db).clear(DB_Entities.AVERAGE_QUERIES)
    },
  },
}

export default idb
