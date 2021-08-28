import { BaseApiService } from '@/services/services'
import emissionsAxiosInstance from '@/services/emissionsAxiosInstance'
import { IProductAverage, IProductDataRange, IProductFE, IProductQuery } from '@/modules/dashboard/services/types'
import { AxiosResponse } from 'axios'
import { mapProductToFE } from '@/modules/dashboard/services/mappers'

interface IEmissionService {
  getProducts(): Promise<IProductFE[]>
  getProductAverage(product: string, params: IProductQuery): Promise<IProductAverage>
  getProductDataRange(product: string, params: IProductQuery): Promise<IProductDataRange>
}

export default class EmissionsService extends BaseApiService implements IEmissionService {
  constructor() {
    super(emissionsAxiosInstance, '')
  }

  async getProducts(): Promise<IProductFE[]> {
    const response: AxiosResponse = await this.axios.get(`${this.resource}/products.json`)
    return mapProductToFE(response?.data)
  }

  async getProductAverage(product: string, params: IProductQuery = { limit: 100 }): Promise<IProductAverage> {
    const response: AxiosResponse = await this.axios.get(`${this.resource}/${product}/average.json`, { params })
    return response.data
  }

  async getProductDataRange(product: string, params: IProductQuery = { limit: 100 }): Promise<IProductDataRange> {
    const response: AxiosResponse = await this.axios.get(`${this.resource}/${product}/data-range.json`)
    return response.data
  }
}
