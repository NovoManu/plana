import { BaseApiService } from '@/services/services'
import emissionsAxiosInstance from '@/services/emissionsAxiosInstance'
import { IProductAverage, IProductDataRange, IProductFE, IProductQuery } from '@/modules/dashboard/services/types'
import { AxiosResponse } from 'axios'
import { mapProductToFE } from '@/modules/dashboard/services/mappers'
import idb from '@/services/idb'

interface IEmissionService {
  getProducts(): Promise<IProductFE[]>
  getProductAverage(product: string, params: IProductQuery): Promise<IProductAverage[]>
  getProductDataRange(product: string, params: IProductQuery): Promise<IProductDataRange>
}

export default class EmissionsService extends BaseApiService implements IEmissionService {
  constructor() {
    super(emissionsAxiosInstance, '')
  }

  async getProducts(): Promise<IProductFE[]> {
    // Note: check cache or download data from api
    let products = await idb.products.get('products')
    if (!products) {
      const response: AxiosResponse = await this.axios.get(`${this.resource}/products.json`)
      products = mapProductToFE(response?.data)
      await idb.products.set('products', products)
    }
    return products
  }

  async getProductAverage(product: string, params: IProductQuery = { limit: 100 }): Promise<IProductAverage[]> {
    // Note: check cache or download data from api
    const query = `${product}: ${JSON.stringify(params)}`
    let average = await idb.queries.get(query)
    if (!average) {
      const response: AxiosResponse = await this.axios.get(`${this.resource}/${product}/average.json`, { params })
      average = response?.data || []
      await idb.queries.set(query, average as IProductAverage[])
    }
    return average as IProductAverage[]
  }

  async getProductDataRange(product: string, params: IProductQuery = { limit: 100 }): Promise<IProductDataRange> {
    const response: AxiosResponse = await this.axios.get(`${this.resource}/${product}/data-range.json`, { params })
    return response.data
  }
}
